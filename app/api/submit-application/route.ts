import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { z } from "zod";

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = () => {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountString)
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not set");

    const serviceAccount = JSON.parse(serviceAccountString);
    if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });

    return getFirestore();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Firebase Admin SDK Initialization Error:", error.message);
    } else {
      console.error("Firebase Admin SDK Initialization Error:", error);
    }
    return null;
  }
};

const db = initializeFirebaseAdmin();

const noBracketsRegex = /^[^()\[\]{}]*$/;

// Zod schema for validation
// REMOVED: recaptchaToken field validation
const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^[0-9]{10}$/),
  year: z.enum(["1", "2", "3", "4"]),
  branch: z.string().min(2),
  firstChoice: z.string().min(1),
  secondChoice: z.string().min(1),
  motivation: z
    .string()
    .min(20)
    .regex(noBracketsRegex, "Brackets are not allowed"),
  contribution: z
    .string()
    .min(20)
    .regex(noBracketsRegex, "Brackets are not allowed"),
  additionalInfo: z
    .string()
    .regex(noBracketsRegex, "Brackets are not allowed")
    .optional(),
});

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const userEmail = session.user.email;

    // REMOVED: Rate limiting check

    // Parse request body
    const body = await request.json();

    // Validate data (without Recaptcha)
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    // Direct data assignment
    const formData = parsed.data;

    // REMOVED: Google reCAPTCHA Verification Fetch

    // Firestore submission check (Prevent duplicates)
    const submissionRef = db.collection("submissions").doc(userEmail);
    const existingSubmission = await submissionRef.get();
    if (existingSubmission.exists) {
      return NextResponse.json({ error: "Already submitted" }, { status: 400 });
    }

    // Save submission
    await submissionRef.set({
      ...formData,
      submittedAt: Timestamp.now(),
      userEmail,
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST /api/submit error:", error.message);
    } else {
      console.error("POST /api/submit unknown error:", error);
    }
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}