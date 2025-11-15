"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* LEFT: Floating glowing spheres — hidden on small screens */}
      <div className="hidden md:flex items-center justify-center p-8 relative overflow-visible bg-gradient-to-b from-emerald-50 to-pink-50">
        <div className="hk-art-viewport relative w-[520px] h-[420px] rounded-2xl bg-white/6 backdrop-blur-sm flex items-center justify-center">
          <div className="absolute inset-8 rounded-xl bg-white/5" />

          {/* big mint sphere */}
          <div className="hk-sphere hk-s1" />

          {/* pink sphere */}
          <div className="hk-sphere hk-s2" />

          {/* small accent */}
          <div className="hk-sphere hk-s3" />

          {/* optional rounded rect shape — position kept inline for quick tweak */}
          <div className="hk-shape" style={{ right: 50, bottom: 120 }} />

          <div className="hk-art-frame" />
        </div>
      </div>

      <div className="p-6 sm:p-10 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/HK-V2.png" alt="HashKrypt" width={44} height={44} />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">HashKrypt</h1>
            <p className="text-xs text-gray-500">
              Welcome back — log in to continue
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="text-xs text-gray-600">Email</span>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Password</span>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-black hover:opacity-95"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="pt-2 text-center text-sm text-gray-600">
            <span>Don’t have an account? </span>
            <Link href="/signup" className="font-medium underline">
              Create account
            </Link>
          </div>

          <div className="pt-4 text-center text-xs text-gray-400">
            <Link href="/" className="underline">
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
