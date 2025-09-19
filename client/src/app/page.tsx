"use client";

import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // subtle parallax background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // blinking cursor for terminal
  const [cursorBlink, setCursorBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  // framer-motion variants for staggered cards
  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  return (
    <main ref={containerRef} className="min-h-screen scroll-smooth">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ y }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        {/* Terminal prompt in top-left */}
        <div className="absolute top-1 left-6 flex items-center font-mono text-lg text-[#39ff14]">
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

        {/* Hero text block moved upward */}
        <div className="relative -mt-25 flex flex-col items-center">
          <motion.h1 className="text-5xl sm:text-7xl font-extrabold">
            <TypingGlitchWords
              text="Encrypt. Share. Decrypt. Securely."
              typingSpeed={50}
              pauseAfterTyped={1000}
              glitchDuration={900}
              glitchInterval={60}
              pauseBetweenWords={700}
            />
          </motion.h1>
          <p className="mt-6 max-w-xl text-gray-400">
            Protect your files with AES-256 encryption. Share safely through
            HashKrypt.
          </p>
          <div className="mt-8">
            <Button variant="glitch" size="lg">
              Start Encrypting
            </Button>
          </div>
        </div>
      </motion.section>

      {/* What is HashKrypt Section */}
      <motion.section
        id="what"
        className="min-h-screen flex flex-col items-start justify-start bg-black text-white px-10 py-14"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9 }}
      >
        {/* Title top-left */}
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          What is HashKrypt
        </h2>

        {/* Cards wrapper - centered group */}
        <div className="w-full mt-25">
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 items-start"
            variants={cardsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Upload */}
            <motion.article
              variants={cardVariant}
              className="relative group bg-gray-900 rounded-2xl p-10 flex flex-col items-center text-center shadow-lg min-h-[300px] transform-gpu"
              whileHover={{ translateY: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              aria-hidden={false}
            >
              <div className="mb-4">
                <CloudArrowUpIcon className="w-12 h-12 text-[#39ff14] mb-2" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload</h3>
              <p className="text-gray-400">
                Select any file type — documents, images, or videos — and
                prepare it for secure transfer.
              </p>

              {/* neon glow outline */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "0 0 25px #39ff14" }}
              />
            </motion.article>

            {/* Encrypt */}
            <motion.article
              variants={cardVariant}
              className="relative group bg-gray-900 rounded-2xl p-10 flex flex-col items-center text-center shadow-lg min-h-[300px] transform-gpu"
              whileHover={{ translateY: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="mb-4">
                <LockClosedIcon className="w-12 h-12 text-[#39ff14] mb-2" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Encrypt</h3>
              <p className="text-gray-400">
                Your file is encrypted locally in your browser with AES-256. We
                never see your plaintext.
              </p>

              {/* neon glow outline */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "0 0 25px #39ff14" }}
              />
            </motion.article>

            {/* Share */}
            <motion.article
              variants={cardVariant}
              className="relative group bg-gray-900 rounded-2xl p-10 flex flex-col items-center text-center shadow-lg min-h-[300px] transform-gpu"
              whileHover={{ translateY: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <div className="mb-4">
                <ShareIcon className="w-12 h-12 text-[#39ff14] mb-2" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share</h3>
              <p className="text-gray-400">
                Send securely to trusted recipients only. Keys are shared
                end-to-end without server access.
              </p>

              {/* neon glow outline */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "0 0 25px #39ff14" }}
              />
            </motion.article>
          </motion.div>
        </div>

        {/* Additional spacing to avoid overlap with next section */}
        <div className="mt-12" />
      </motion.section>

      {/* Trust Section */}
      <motion.section
        id="trust"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0d0d0d] text-white px-8"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
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
