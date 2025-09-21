"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function CheckIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <svg className="w-4 h-4 text-[#39ff14]" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [focusedOnPassword, setFocusedOnPassword] = useState(false);

  // Constraint checks
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirm;

  const formValid =
    fullName.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phone.trim().length >= 7 &&
    country.trim().length > 1 &&
    hasMinLength &&
    hasUpper &&
    hasNumber &&
    hasSpecial &&
    passwordsMatch &&
    agree;

  useEffect(() => {
    // optional: scroll into view when focusing password on mobile
    if (focusedOnPassword) {
      const id = setTimeout(() => {
        const el = document.activeElement;
        if (el instanceof HTMLElement)
          el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
      return () => clearTimeout(id);
    }
  }, [focusedOnPassword]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;
    // TODO: wire to your signup/auth endpoint (Supabase / custom API)
    // Example flow:
    // - call API to create user (email/password)
    // - generate client-side keypair + encrypt private key (in browser)
    // - upload public key + encrypted private key to user's profile via API
    // For now we simply redirect to login (demo).
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-2xl bg-gray-900/60 border border-gray-800 rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Secure, end-to-end encrypted file sharing — your private key never
          leaves your browser unless you backup it encrypted.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <div className="text-xs text-gray-300 mb-1">Full name</div>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block">
              <div className="text-xs text-gray-300 mb-1">Country</div>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
                placeholder="India"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="text-xs text-gray-300 mb-1">Phone</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
                placeholder="+91 99999 99999"
              />
            </label>
          </div>

          <div className="relative">
            <label className="block">
              <div className="text-xs text-gray-300 mb-1">Password</div>
              <input
                type="password"
                value={password}
                onFocus={() => setFocusedOnPassword(true)}
                onBlur={() => {
                  // keep visible if confirm is active or there's input — else hide after short delay
                  setTimeout(() => {
                    if (!confirm && password.length === 0)
                      setFocusedOnPassword(false);
                  }, 160);
                }}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
                placeholder="Choose a strong password"
                aria-describedby="password-help"
              />
            </label>

            {/* Password constraints UI — appears only when user focused on password */}
            <div
              id="password-help"
              className={`mt-2 rounded-lg bg-gray-900/70 border border-gray-800 p-3 space-y-2 text-sm text-gray-300 transition-opacity duration-200 ${
                focusedOnPassword
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-gray-200">
                  Password requirements
                </div>
                <div className="text-xs text-gray-400">Realtime</div>
              </div>

              <ul className="space-y-1 mt-2">
                <li className="flex items-center gap-3">
                  <CheckIcon ok={hasMinLength} />
                  <span
                    className={hasMinLength ? "text-gray-200" : "text-gray-400"}
                  >
                    At least 8 characters
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon ok={hasUpper} />
                  <span
                    className={hasUpper ? "text-gray-200" : "text-gray-400"}
                  >
                    At least 1 uppercase letter
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon ok={hasNumber} />
                  <span
                    className={hasNumber ? "text-gray-200" : "text-gray-400"}
                  >
                    At least 1 number
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon ok={hasSpecial} />
                  <span
                    className={hasSpecial ? "text-gray-200" : "text-gray-400"}
                  >
                    At least 1 special character
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <label className="block">
            <div className="text-xs text-gray-300 mb-1">Confirm password</div>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/30"
              placeholder="Re-enter password"
            />
          </label>

          <div className="flex items-center gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 focus:ring-2 focus:ring-[#39ff14]/30"
            />
            <label htmlFor="agree" className="text-sm text-gray-300">
              I agree to the{" "}
              <Link href="/terms" className="text-[#39ff14] underline">
                Terms &amp; Conditions
              </Link>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!formValid}
              className={`w-full rounded-lg px-4 py-3 font-semibold ${
                formValid
                  ? "bg-[#39ff14] text-black hover:bg-[#2ecc71]"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              } transition`}
            >
              Create account
            </button>
          </div>

          <div className="text-sm text-gray-400 text-center mt-3">
            Already have an account?{" "}
            <Link href="/login" className="text-[#39ff14] underline">
              Log in
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
