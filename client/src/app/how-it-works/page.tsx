"use client";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <motion.h1
        className="text-5xl font-bold text-[#39ff14] mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h1>

      <motion.p
        className="max-w-2xl text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Upload, encrypt with AES-256, share keys securely, and decrypt files —
        all end-to-end encrypted.
      </motion.p>
    </section>
  );
}
