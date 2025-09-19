"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TypingGlitchWords from "@/components/TypingGlitchWords";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ShareIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);

  // track scroll progress relative to the whole page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero zoom-out & fade when scrolling into "What is HashKrypt"
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  // blinking terminal cursor
  const [cursorBlink, setCursorBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen scroll-smooth">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ scale, opacity }} // zooms out on scroll
      >
        {/* Terminal top-left */}
        <div className="absolute top-1 left-6 flex items-center font-mono text-lg text-[#39ff14] z-10">
          <span className="font-bold">User@HashKrypt:~$</span>
          <span
            className="inline-block ml-2"
            style={{
              width: "12px",
              height: "1.2em",
              background: "#39ff14",
              opacity: cursorBlink ? 1 : 0,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Hero text block with load-in animation */}
        <div className="relative flex flex-col items-center -mt-28">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TypingGlitchWords
              text="Encrypt. Share. Decrypt. Securely."
              typingSpeed={50}
              pauseAfterTyped={1000}
              glitchDuration={900}
              glitchInterval={60}
              pauseBetweenWords={700}
            />
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Protect your files with AES-256 encryption. Share safely through
            HashKrypt.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button variant="glitch" size="lg">
              Start Encrypting
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* What is HashKrypt Section */}
      <motion.section
        id="what"
        className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-10 py-20 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9 }}
      >
        {/* Glowing backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0a0a0a] to-black opacity-90" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[30vw] h-[30vw] bg-[#39ff14]/20 rounded-full blur-3xl opacity-55" />

        <h2 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-[#39ff14] via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
          What is HashKrypt?
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-[#39ff14] to-transparent mt-4 mb-12 rounded-full" />

        <p className="max-w-4xl text-gray-300 text-lg leading-relaxed text-center mb-16">
          <span className="text-[#39ff14] font-semibold">HashKrypt</span> is
          your futuristic vault for securing any file — docs, images, videos, or
          archives. Files are encrypted locally in your browser with{" "}
          <span className="text-[#39ff14]">AES-256 </span> before leaving your
          device. You can <span className="text-[#39ff14]">download</span> them
          offline or <span className="text-[#39ff14]">share securely</span> via
          HashKrypt. Recipients decrypt instantly, making collaboration private
          and seamless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-lg group overflow-hidden">
            <CloudArrowUpIcon className="w-14 h-14 text-[#39ff14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">Upload</h3>
            <p className="text-gray-400">
              Select any file type and prepare it for secure transfer with one
              click.
            </p>
          </motion.article>
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-lg group overflow-hidden">
            <LockClosedIcon className="w-14 h-14 text-[#39ff14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">Encrypt</h3>
            <p className="text-gray-400">
              AES-256 encryption happens instantly in your browser. No plaintext
              leaves your device.
            </p>
          </motion.article>
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-lg group overflow-hidden">
            <ShareIcon className="w-14 h-14 text-[#39ff14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Share & Decrypt
            </h3>
            <p className="text-gray-400">
              Share securely via HashKrypt. Recipients decrypt instantly,
              without server access.
            </p>
          </motion.article>
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section
        id="trust"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0d0d0d] text-white px-8"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1 mb-12 md:mb-0">
          <h2 className="text-4xl font-bold mb-6">Trust & Credibility</h2>
          <p className="text-gray-400 max-w-lg">
            Audited cryptography. Open-source core. Community-driven security.
          </p>
        </div>
        <div className="flex-1 flex space-x-8 justify-center">
          <div className="flex flex-col items-center">
            <ShieldCheckIcon className="w-12 h-12 text-green-400" />
            <span className="mt-2 text-gray-400">Audited</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckBadgeIcon className="w-12 h-12 text-green-400" />
            <span className="mt-2 text-gray-400">Community Trusted</span>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
