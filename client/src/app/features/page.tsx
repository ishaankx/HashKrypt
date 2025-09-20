// app/features/page.tsx
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, easeOut, Variants } from "framer-motion";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  BoltIcon,
  UserIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
/**
 * Features page for HashKrypt
 *
 * - Mobile-first responsive layout
 * - Animated feature grid + deep dive sections
 * - Comparison block: HashKrypt vs typical providers
 * - Smooth anchor scrolling
 *
 * Note: motion variants are typed as `any` to avoid TS variant typing errors
 * similar to the earlier issues you encountered.
 */

// small utility types
type Feature = {
  id: string;
  title: string;
  short: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  details: React.ReactNode | React.ReactNode[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: easeOut },
  },
};

const featuresData: Feature[] = [
  {
    id: "secure-by-design",
    title: "Client-side AES-256 Encryption",
    short:
      "Files are encrypted in your browser — plaintext never leaves your device.",
    icon: LockClosedIcon,
    details: [
      <>
        Encryption runs locally using **AES-256**. The file plaintext never
        traverses the network unencrypted — only the encrypted blob goes to
        storage (if you choose to upload).
      </>,
      <>
        This means you retain control of your data and secrets — we never hold
        your unencrypted files or file keys.
      </>,
    ],
  },
  {
    id: "personal-key",
    title: "Personal Key & Key Vault",
    short:
      "A Personal Key unlocks an encrypted Key Vault that holds file keys.",
    icon: KeyClosedOrFallback(),
    details: [
      <>
        On first signup a **Personal Key** is generated in your browser. It is
        never sent to our servers. Use it to unlock your Key Vault — this stores
        your personal file keys and keys shared to you.
      </>,
      <>
        Keep three things safe forever: <strong>email</strong>,{" "}
        <strong>password</strong>, and your <strong>Personal Key</strong>.
        That’s all you need to access your vault.
      </>,
    ],
  },
  {
    id: "share-download",
    title: "Flexible Sharing & Local Control",
    short:
      "Download encrypted file + key or share directly to other HashKrypt users.",
    icon: ArrowDownTrayIcon,
    details: [
      <>
        After encryption you receive a file-key. You can either download both
        the encrypted file and the key for offline/manual sharing, or choose to
        share through HashKrypt.
      </>,
      <>
        Shared keys are encrypted to the recipient and appear in their Key Vault
        — they must unlock it with their Personal Key to access the key and
        decrypt the file.
      </>,
    ],
  },
  {
    id: "any-file-type",
    title: "Any file type",
    short: "Encrypt video, audio, images, documents, archives — any file.",
    icon: BoltIcon,
    details: [
      <>
        HashKrypt supports arbitrary file types (mp4, mp3, png, jpeg, pdf, zip,
        txt). Encryption is identical for all types and performed client-side.
      </>,
    ],
  },
  {
    id: "manual-decrypt",
    title: "Manual / Offline Decrypt",
    short:
      "Recipient can decrypt even with a locally-shared key via the Decrypt page.",
    icon: EnvelopeOpenIcon,
    details: [
      <>
        If you send an encrypted file + key outside HashKrypt, the recipient can
        still decrypt by uploading the encrypted file and pasting the file-key
        on the Decrypt page.
      </>,
    ],
  },
  {
    id: "account-control",
    title: "Minimal Account Requirements",
    short:
      "Email, password, and Personal Key are the only things you need long-term.",
    icon: UserIcon,
    details: [
      <>
        Your Personal Key plus your email and password are sufficient to access
        your account. If you lose the Personal Key and password, the vault is
        not recoverable — that’s intentional.
      </>,
    ],
  },
];

function KeyClosedOrFallback() {
  // small helper to return appropriate icon component inline
  return KeyIconFallback;
}

// A small inline Key icon (heroicons Key icon not available in outline pack by default)
function KeyIconFallback(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 11a6 6 0 1111.314 2.116L20 19v2h-2l-2-2-2 2H13l-3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function FeaturesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const pathname = usePathname(); // ✅ add this here

  // smooth anchor scroll (same helper pattern as other pages)
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* HERO */}
      <section className="relative flex items-center justify-center text-center px-6 py-14 md:py-24">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#39ff14] via-green-400 to-emerald-500 bg-clip-text text-transparent">
            Features — Why HashKrypt
          </h1>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            Privacy-first, client-side encryption and a simple key vault model
            that puts you in control. Encrypt any file locally, share securely,
            or keep everything offline — it’s your choice.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button
              variant="rect"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="#features">Explore Features</a>
            </Button>
            <Button
              variant="rect"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="#compare">Compare</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="px-6 mt-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuresData.map((f) => (
              <motion.article
                key={f.id}
                variants={itemVariants}
                className="relative rounded-2xl bg-gray-900/30 border border-gray-800 p-5 hover:scale-[1.02] transition-transform shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-[#39ff14]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">{f.short}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="rect" size="sm" asChild>
                        <button onClick={() => toggle(f.id)}>Learn more</button>
                      </Button>
                      <a
                        href="#details"
                        className="text-sm text-gray-400 hover:text-white underline"
                        onClick={() => setOpenId(f.id)}
                      >
                        See details
                      </a>
                    </div>
                  </div>
                </div>

                {/* Inline expandable details when open on card */}
                {openId === f.id && (
                  <div className="mt-4 text-gray-300 text-sm">
                    {Array.isArray(f.details)
                      ? (f.details as React.ReactNode[]).map((d, i) => (
                          <div key={i} className="mb-2">
                            {d}
                          </div>
                        ))
                      : f.details}
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DETAILS / DEEP DIVE - Accordion style */}
      <section id="details" className="px-6 mt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Deep dive
          </h2>
          <p className="text-gray-400 mb-6">
            Step through each capability to see how HashKrypt handles
            encryption, key management and sharing.
          </p>

          <div className="space-y-4">
            {featuresData.map((f, idx) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <div className="relative bg-gray-900/30 border border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                        <f.icon className="w-6 h-6 text-[#39ff14]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{f.title}</h3>
                        <div className="text-sm text-gray-300 mt-1">
                          {f.short}
                        </div>
                      </div>
                    </div>

                    <button
                      aria-expanded={openId === f.id}
                      onClick={() => toggle(f.id)}
                      className="p-2 rounded-md hover:bg-white/5 transition"
                    >
                      <svg
                        className={`w-5 h-5 transform transition ${
                          openId === f.id ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={`mt-4 text-gray-300 text-sm transition-all ${
                      openId === f.id
                        ? "max-h-[720px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pb-3">
                      {Array.isArray(f.details)
                        ? (f.details as React.ReactNode[]).map((d, i) => (
                            <div key={i} className="mb-2">
                              {d}
                            </div>
                          ))
                        : f.details}
                    </div>

                    {/* extra illustrative bullet points */}
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Local AES-256 encryption — performed in browser</li>
                      <li>
                        File-keys are unique per file and can be downloaded or
                        shared
                      </li>
                      <li>
                        Key Vault encrypted client-side and unlocked with
                        Personal Key
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="compare" className="px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
            How HashKrypt compares
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-md">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900/40">
                <tr>
                  <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-300">
                    Capability
                  </th>
                  <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-[#39ff14]">
                    HashKrypt
                  </th>
                  <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-300">
                    Typical Cloud Providers
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Client-side encryption",
                    "Yes — AES-256 in browser",
                    "Usually server-side or optional (varies)",
                  ],
                  [
                    "Key custody",
                    "You hold Personal Key & file keys (user-side)",
                    "Provider-managed KMS (provider has control)",
                  ],
                  [
                    "Offline manual decrypt",
                    "Yes — upload encrypted file + paste key",
                    "Depends — not standard UX",
                  ],
                  [
                    "Sharing model",
                    "Encrypted file + encrypted shared file-key into recipient vault",
                    "Often uses server-managed access controls",
                  ],
                  [
                    "Recovery policy",
                    "User-responsible; no provider-side recovery",
                    "Provider recovery/backups are common (privacy tradeoff)",
                  ],
                ].map(([cap, hk, other], idx) => (
                  <tr
                    key={cap}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-900/20" : "bg-transparent"
                    } border-t border-gray-800`}
                  >
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">
                      {cap}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-white">
                      {hk}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-400">
                      {other}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NOTES / FAQ */}
      <section className="px-6 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Notes & FAQ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 bg-gray-900/30 border border-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">
                Do I need to be a HashKrypt user to receive shared files?
              </h4>
              <p className="text-gray-300 text-sm">
                If you use HashKrypt sharing, the recipient must be a HashKrypt
                user so we can encrypt the file-key to their vault. If not, you
                can always share the encrypted file and key manually.
              </p>
            </div>

            <div className="p-5 bg-gray-900/30 border border-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">
                What if I lose my Personal Key?
              </h4>
              <p className="text-gray-300 text-sm">
                HashKrypt prioritizes privacy: if you lose both your password
                and Personal Key, your Key Vault cannot be recovered. Store your
                Personal Key offline and securely.
              </p>
            </div>

            <div className="p-5 bg-gray-900/30 border border-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">
                Which file types are supported?
              </h4>
              <p className="text-gray-300 text-sm">
                All file types are supported: images, audio, video, documents,
                archives — the AES-256 encryption works the same for any binary
                blob.
              </p>
            </div>

            <div className="p-5 bg-gray-900/30 border border-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">
                Is performance okay for large files?
              </h4>
              <p className="text-gray-300 text-sm">
                Browser-based encryption handles typical files well. For
                extremely large files you may prefer desktop-based tools — but
                HashKrypt is optimized for modern browsers and hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      {/* CTA FOOTER */}
      <section className="px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center py-12">
          <h3 className="text-xl sm:text-2xl font-extrabold mb-4">
            Ready to protect your files?
          </h3>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Sign up and generate your Personal Key to start encrypting today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Button
              variant="rect"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="/signup">Get Started — Free</a>
            </Button>
            <Button
              variant="rect"
              size="lg"
              asChild
              className={`w-full sm:w-auto ${
                pathname === "/" ? "bg-[#39ff14] text-black" : ""
              }`}
            >
              <Link href="/">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
