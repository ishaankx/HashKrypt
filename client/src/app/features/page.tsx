"use client";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <motion.h1
        className="text-5xl font-bold text-[#39ff14] mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Features
      </motion.h1>

      <motion.p
        className="max-w-2xl text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Explore the powerful encryption, seamless file sharing, and end-to-end
        security HashKrypt provides.
      </motion.p>
    </section>
  );
}
