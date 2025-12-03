"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ConnectPage() {
  const [text, setText] = useState("https://campusxcore.vercel.app");
  const [qrColor, setQrColor] = useState("000000"); 
  const [bgColor, setBgColor] = useState("ffffff"); 

  // We use a reliable public API to generate the QR code image without npm packages
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&color=${qrColor}&bgcolor=${bgColor}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navbar Placeholder (Back Button) */}
      <div className="p-6">
        <Link href="/" className="flex items-center text-slate-400 hover:text-white transition-colors gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono uppercase tracking-widest text-sm">Return to Home</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: The Generator Tool */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              QR Forge
            </h1>
            <p className="text-slate-400 text-lg">
              Generate instant QR codes for your project links, GitHub profiles, or portfolios.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Destination URL / Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter link here..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-mono"
            />

            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-400 text-xs uppercase font-bold mb-1">Status</div>
                  <div className="text-white font-mono text-sm">Active</div>
               </div>
               <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="text-purple-400 text-xs uppercase font-bold mb-1">Format</div>
                  <div className="text-white font-mono text-sm">PNG / 250px</div>
               </div>
            </div>
          </div>

          <button 
            onClick={() => window.open(qrUrl, '_blank')}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download QR Code
          </button>
        </div>

        {/* RIGHT COLUMN: The Preview & Connect */}
        <div className="flex flex-col items-center justify-center space-y-8">
          
          {/* The QR Display Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={qrUrl} 
                  alt="Generated QR Code" 
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="mt-6 text-slate-400 font-mono text-sm text-center max-w-xs break-all">
                {text || "Enter text to generate..."}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 text-slate-600">
            <div className="h-px bg-slate-800 flex-grow"></div>
            <span className="text-xs uppercase tracking-widest">Connect With Us</span>
            <div className="h-px bg-slate-800 flex-grow"></div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Link href="https://instagram.com" target="_blank" className="p-4 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 group">
               <svg className="w-6 h-6 text-slate-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
               </svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-4 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 group">
               <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 9.289-5.124 9.289 5.022v3.284h-9.321v-16z"/>
               </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}