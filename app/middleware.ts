import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Simplified middleware for Demo:
  // We strictly allow all traffic to ensure no "403" or "429" errors occur during the presentation.
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}