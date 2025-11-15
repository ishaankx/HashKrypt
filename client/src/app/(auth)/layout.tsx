// app/(auth)/layout.tsx
"use client";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 hk-auth-bg">
      {/* Keep just the page gradient here — all hk animations live in globals.css */}
      <style>{`
        .hk-auth-bg {
          background: linear-gradient(90deg, rgba(255,230,245,0.55) 0%, rgba(240,255,246,0.55) 50%, rgba(240,255,250,0.55) 100%);
        }
        .hk-card-shadow { box-shadow: 0 10px 30px rgba(8,15,20,0.06); }
      `}</style>

      <div className="w-full max-w-5xl">
        <div className="hk-card-shadow rounded-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
