"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    // TODO: call your auth endpoint (Supabase / NextAuth)
    // Example: await supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => {
      setBusy(false);
      // For now just navigate to root
      router.push("/");
    }, 600);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-gray-900/60 border border-gray-800 rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">
          Sign in to access your encrypted files and key vault.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="text-xs text-gray-300 mb-1">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
              placeholder="you@domain.com"
            />
          </label>

          <label className="block">
            <div className="text-xs text-gray-300 mb-1">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
              placeholder="Your password"
            />
          </label>

          <button
            type="submit"
            disabled={busy || !email || !password}
            className={`w-full rounded-lg px-4 py-3 font-semibold ${
              busy
                ? "bg-gray-700 text-gray-300"
                : "bg-[#39ff14] text-black hover:bg-[#2ecc71]"
            } transition`}
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-sm text-gray-400 text-center mt-3">
            Need an account?{" "}
            <Link href="/signup" className="text-[#39ff14] underline">
              Create account
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
