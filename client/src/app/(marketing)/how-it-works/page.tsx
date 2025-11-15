"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  KeyIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { easeOut } from "framer-motion";

// Step props type
type StepProps = {
  title: string;
  desc: React.ReactNode | React.ReactNode[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  index: number;
  open: boolean;
  onToggle: (i: number) => void;
};

// Accordion Step
const Step: React.FC<StepProps> = ({
  title,
  desc,
  icon: Icon,
  index,
  open,
  onToggle,
}) => {
  return (
    <div className="relative bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-5 md:p-7 shadow-md overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#39ff14]" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <button
              aria-expanded={open}
              onClick={() => onToggle(index)}
              className="p-1 rounded-md hover:bg-white/5 transition"
            >
              <ChevronDownIcon
                className={`w-5 h-5 transform transition ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <div
            className={`mt-3 text-gray-300 text-sm leading-relaxed transition-all duration-500 ease-in-out ${
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-80"
            }`}
            style={{ overflow: "hidden" }}
          >
            {Array.isArray(desc)
              ? desc.map((d, i) => (
                  <div key={i} className="mb-2">
                    {d}
                  </div>
                ))
              : desc}
          </div>
        </div>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut, // ✅ properly typed easing
    },
  },
};

export default function HowItWorksPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchor);
    return () => document.removeEventListener("click", handleAnchor);
  }, []);

  const mobileViewportAmount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 0.08 : 0.3;

  useEffect(() => setOpenIndex(0), []);

  // Full detailed steps
  const steps: Omit<StepProps, "open" | "onToggle">[] = [
    {
      title: "1. Sign Up — your identity + Personal Key",
      icon: UserIcon,
      desc: [
        <>
          When you sign up, create an account with your <strong>email</strong>{" "}
          and password. During signup a <strong>Personal Key</strong>{" "}
          (high-entropy secret) is generated locally and never sent to servers.
        </>,
        <>
          <strong>Important:</strong> Keep 3 things safe forever: <em>Email</em>
          , <em>Password</em>, <em>Personal Key</em>.
        </>,
        <>
          The Personal Key unlocks your <strong>Key Vault</strong> — where your
          personal and shared keys live.
        </>,
      ],
      index: 0,
    },
    {
      title: "2. Key Vault — your secure key store",
      icon: KeyIcon,
      desc: [
        <>
          Encrypted locally with your Personal Key. Unlocking loads keys (yours
          + shared) into memory only.
        </>,
        <>Never decrypted server-side — only in your browser.</>,
      ],
      index: 1,
    },
    {
      title: "3. Encrypt — AES-256 locally",
      icon: LockClosedIcon,
      desc: [
        <>
          Encrypt any file type (docs, media, zips). AES-256 in-browser ensures
          plaintext never leaves device.
        </>,
        <>
          After encryption you get a unique File Key. Options:
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Download file + key locally</li>
            <li>Or share securely via HashKrypt</li>
          </ul>
        </>,
      ],
      index: 2,
    },
    {
      title: "4. Download locally or Share via HashKrypt",
      icon: ArrowDownTrayIcon,
      desc: [
        <>
          Download both encrypted file + key offline, or share via HashKrypt.
          The file is stored encrypted and the File Key is added (encrypted)
          into recipient’s vault.
        </>,
      ],
      index: 3,
    },
    {
      title: "5. Recipient flow — unlock Key Vault & decrypt",
      icon: PaperAirplaneIcon,
      desc: [
        <>
          Recipient (must be a user) unlocks Key Vault with their Personal Key,
          retrieves shared key, decrypts file with AES-256, and downloads
          plaintext.
        </>,
      ],
      index: 4,
    },
    {
      title: "6. Manual decrypt (offline flow)",
      icon: DocumentTextIcon,
      desc: [
        <>
          If encrypted file + key shared outside HashKrypt, upload file + paste
          File Key manually in Decrypt page. Decrypted locally.
        </>,
        <>Works across any file transfer method — cryptography is identical.</>,
      ],
      index: 5,
    },
  ];

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0a0a0a] to-black opacity-90" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[35vw] h-[25vw] bg-[#39ff14]/20 rounded-full blur-3xl opacity-55" />

      {/* Hero */}
      {/* Hero */}
      <motion.section
        className="relative flex items-center justify-center text-center overflow-hidden px-4 sm:px-6 
             min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full max-w-3xl">
          <h1
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold 
                 bg-gradient-to-r from-[#39ff14] via-green-400 to-emerald-500 
                 bg-clip-text text-transparent drop-shadow-lg leading-snug"
          >
            How HashKrypt Works
          </h1>

          <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Private, user-controlled encryption. Learn the steps from signup to
            decrypting shared files.
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="rect"
              size="lg"
              asChild
              className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
            >
              <a href="#flow">See the Flow</a>
            </Button>
            <Button
              variant="rect"
              size="lg"
              asChild
              className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
            >
              <a href="#vault">Key Vault Details</a>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Flow cards */}
      <section id="flow" className="px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                title: "Sign Up",
                icon: UserIcon,
                subtitle: "Create account & Personal Key",
              },
              {
                title: "Encrypt",
                icon: LockClosedIcon,
                subtitle: "AES-256 in your browser",
              },
              {
                title: "Share / Download",
                icon: PaperAirplaneIcon,
                subtitle: "Local or HashKrypt share",
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                className="relative bg-gray-900/30 backdrop-blur-md border border-gray-800 
                     rounded-xl p-5 sm:p-6 text-center shadow-md 
                     hover:shadow-[#39ff14]/30 transition"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0a0a0a] border border-gray-800 flex items-center justify-center">
                    <c.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#39ff14]" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {c.title}
                </h3>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm">
                  {c.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed steps accordion */}
      <section id="details" className="px-6 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Step-by-step details
          </h2>
          <p className="text-gray-400 mb-8">
            Expand each step for more details.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              >
                <Step {...s} open={openIndex === i} onToggle={toggle} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vault deep dive */}
      <section id="vault" className="px-6 mt-12 mb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          {/* Info panel */}
          <motion.div
            className="relative bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold text-white mb-3">
              Key Vault — how it protects your keys
            </h3>
            <p className="text-gray-300 mb-4 text-center">
              The Key Vault stores:
            </p>
            {/* Centered but left-aligned bullets */}
            <ul className="list-disc text-gray-300 text-left mx-auto w-fit pl-5">
              <li>Your personal encryption keys</li>
              <li>Keys shared with you</li>
            </ul>
            <p className="text-gray-300 mt-4 text-center">
              Encrypted client-side with your <strong>Personal Key</strong>.
              Decrypted in-memory only.
            </p>
            {/* Buttons centered */}
            <div className="mt-6 flex gap-3 justify-center">
              <Button variant="rect" size="default" asChild>
                <a href="#details">Explore Steps</a>
              </Button>
              <Button variant="rect" size="default" asChild>
                <a href="#flow">See Flow</a>
              </Button>
            </div>
          </motion.div>

          {/* Vault card */}
          <motion.div
            className="relative p-6 rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div className="w-full max-w-sm bg-gradient-to-tr from-black/40 to-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#081008] flex items-center justify-center border border-gray-800">
                  <KeyIcon className="w-6 h-6 text-[#39ff14]" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Personal Key Vault
                  </div>
                  <div className="text-sm text-gray-400">
                    Encrypted with your Personal Key
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-900/30 border border-gray-800 text-sm">
                  <div className="font-semibold text-white">Personal keys</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Files you encrypted
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/30 border border-gray-800 text-sm">
                  <div className="font-semibold text-white">Shared keys</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Keys shared with you
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notes */}
      <section className="px-6 mb-28">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#39ff14] via-green-400 to-emerald-500 bg-clip-text text-transparent mb-10">
            Notes & Best Practices
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800 rounded-xl shadow hover:shadow-[#39ff14]/20 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                  📂
                </div>
                <h4 className="text-lg font-semibold text-white">
                  Store Personal Key Offline
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                Treat your Personal Key like a recovery key — keep it safe and
                offline.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800 rounded-xl shadow hover:shadow-[#39ff14]/20 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                  👥
                </div>
                <h4 className="text-lg font-semibold text-white">
                  Sharing Requires HashKrypt
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                Recipients must be HashKrypt users to receive encrypted files
                directly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800 rounded-xl shadow hover:shadow-[#39ff14]/20 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                  🔒
                </div>
                <h4 className="text-lg font-semibold text-white">
                  AES-256 Encryption
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                All cryptographic operations are performed locally on your
                device for maximum security.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800 rounded-xl shadow hover:shadow-[#39ff14]/20 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                  ⚠️
                </div>
                <h4 className="text-lg font-semibold text-white">
                  Recovery Limitations
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                If you lose both your password and Personal Key, your vault
                cannot be recovered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
