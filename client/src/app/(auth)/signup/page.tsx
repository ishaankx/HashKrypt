"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [personalKeyB64, setPersonalKeyB64] = useState<string | null>(null);
  const [showPersonalKey, setShowPersonalKey] = useState(false);

  // password rules
  const lengthOk = password.length >= 8;
  const upperOk = /[A-Z]/.test(password);
  const numberOk = /[0-9]/.test(password);
  const specialOk = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const allOk = lengthOk && upperOk && numberOk && specialOk;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  function toBase64(u8: Uint8Array) {
    return btoa(String.fromCharCode(...Array.from(u8)));
  }
  function fromBase64(b64: string) {
    const str = atob(b64);
    return Uint8Array.from(Array.from(str).map((c) => c.charCodeAt(0)));
  }

  async function downloadText(filename: string, text: string) {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    if (!allOk) {
      setServerError("Password does not meet criteria");
      return;
    }
    if (!passwordsMatch) {
      setServerError("Passwords do not match");
      return;
    }
    if (!agree) {
      setServerError("You must agree to the Terms & Conditions");
      return;
    }

    setLoading(true);
    try {
      await sodium.ready;

      // 1) Generate personalKey (32 bytes)
      const personalKey = sodium.randombytes_buf(32);
      const personalKeyB64Local = toBase64(personalKey);
      setPersonalKeyB64(personalKeyB64Local);
      setShowPersonalKey(true);

      // 2) Generate account keypair (crypto_box_keypair -> publicKey/privateKey)
      const keypair = sodium.crypto_box_keypair();
      const publicKeyB64 = toBase64(keypair.publicKey);

      // 3) Derive symmetric key from personalKey using pwhash (store salt)
      const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
      const opslimit = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE;
      const memlimit = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE;
      const derived = sodium.crypto_pwhash(
        32,
        personalKey,
        salt,
        opslimit,
        memlimit,
        sodium.crypto_pwhash_ALG_DEFAULT
      );

      // 4) Encrypt private key with derived key (secretbox)
      const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
      const ciphertext = sodium.crypto_secretbox_easy(
        keypair.privateKey,
        nonce,
        derived
      );

      const encryptedBlob = {
        salt: toBase64(salt),
        nonce: toBase64(nonce),
        ciphertext: toBase64(ciphertext),
        kdf: { opslimit, memlimit },
      };

      // 5) POST to server auth/signup
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE || ""}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important for cookies
          body: JSON.stringify({
            fullName,
            email,
            phone,
            country,
            password,
            publicKey: publicKeyB64,
            encryptedPrivKeyBlob: encryptedBlob,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Sign up failed");
      }

      // Offer user to download/backup the personal key (they must save it)
      // Wait for user to confirm saved key (UX: we show it and they must click confirm)
      // For now redirect to a "save your key" page or dashboard
      // We'll push user to a "confirm backup" page; for simplicity go to /save-key
      router.push("/save-key"); // create this route to show key backup instructions
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/0">
      {/* LEFT: your original art panel — unchanged */}
      <div className="hidden md:flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-emerald-50 to-pink-50">
        <div className="hk-art-viewport relative w-[520px] h-[420px] rounded-2xl bg-white/6 backdrop-blur-sm flex items-center justify-center">
          <div className="absolute inset-8 rounded-xl bg-white/5" />
          <div className="hk-sphere hk-s1" />
          <div className="hk-sphere hk-s2" />
          <div className="hk-sphere hk-s3" />
          <div className="hk-sphere hk-s4" />
          <div className="hk-sphere hk-s5" />
          <div className="hk-sphere hk-s6" />
          <div className="hk-sphere hk-s7" />
          <div className="hk-sphere hk-s8" />
          <div className="hk-shape" style={{ right: 50, bottom: 120 }} />
          <div className="hk-art-frame" />
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="p-6 sm:p-10 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/HK-V2.png" alt="HashKrypt" width={44} height={44} />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">HashKrypt</h1>
            <p className="text-xs text-gray-500">Create your account</p>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* form fields (same as your original UI) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs text-gray-600">Full name</span>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Phone</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <span className="text-xs text-gray-600">Country</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">Select country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </label>
          </div>

          <div className="relative">
            <label className="block">
              <span className="text-xs text-gray-600">Password</span>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>

            {(focused || password.length > 0) && (
              <div className="absolute left-0 -top-28 w-full sm:w-80 z-20 bg-white border border-gray-100 shadow-md p-3 rounded-md">
                <p className="text-xs text-gray-500 mb-2">
                  Password must have:
                </p>
                <ul className="space-y-1">
                  <RuleLine ok={lengthOk} text="At least 8 characters" />
                  <RuleLine ok={upperOk} text="One uppercase letter" />
                  <RuleLine ok={numberOk} text="One number" />
                  <RuleLine ok={specialOk} text="One special character" />
                </ul>
              </div>
            )}
          </div>

          <label className="block">
            <span className="text-xs text-gray-600">Confirm password</span>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
          </label>

          <div className="flex items-center gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree to the{" "}
              <a className="underline" href="#">
                Terms & Conditions
              </a>
            </label>
          </div>

          {serverError && <p className="text-sm text-red-500">{serverError}</p>}

          <div>
            <button
              disabled={!allOk || !passwordsMatch || !agree || loading}
              type="submit"
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white ${
                !allOk || !passwordsMatch || !agree || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:opacity-95"
              }`}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <div className="pt-2 text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link href="/login" className="font-medium underline">
              Log in
            </Link>
          </div>

          <div className="pt-4 text-center text-xs text-gray-400">
            <Link href="/" className="underline">
              Back to home
            </Link>
          </div>
        </form>

        {/* Personal key display + download */}
        {showPersonalKey && personalKeyB64 && (
          <div className="mt-6 p-4 border rounded-md bg-amber-50">
            <h3 className="text-sm font-semibold mb-2">
              Your Personal Key — Save it now
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              This key unlocks your key vault. If lost, you will not be able to
              decrypt your files. Save it offline.
            </p>
            <textarea
              readOnly
              value={personalKeyB64}
              rows={3}
              className="w-full p-2 text-xs rounded-md border"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(personalKeyB64);
                }}
                className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
              >
                Copy
              </button>
              <button
                onClick={() =>
                  downloadText("hashkrypt-personal-key.txt", personalKeyB64)
                }
                className="px-3 py-1 rounded bg-emerald-600 text-white text-sm"
              >
                Download key file
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RuleLine({ ok, text }: { ok: boolean; text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`w-4 h-4 inline-flex items-center justify-center rounded-full text-white text-[10px] ${
          ok ? "bg-emerald-500" : "bg-gray-300"
        }`}
        aria-hidden
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className={`text-xs ${ok ? "text-gray-700" : "text-gray-400"}`}>
        {text}
      </span>
    </li>
  );
}
