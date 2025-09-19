"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TypingGlitchWords from "@/components/TypingGlitchWords";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex flex-col min-h-[100vh] terminal-bg text-center text-gray-100">
      {/* Terminal prompt in top-left */}
      <div className="absolute top-4 left-6 flex items-center font-mono text-xl text-[#39ff14]">
        <span className="font-bold">User@HashKrypt:~$</span>
        <span
          className="inline-block ml-2"
          style={{
            width: "12px",
            height: "1.5em",
            background: "#39ff14",
            opacity: cursorBlink ? 1 : 0,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Page body */}
      <div className="flex flex-col flex-1 items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold sm:text-6xl"
        >
          <TypingGlitchWords
            text="Encrypt. Share. Decrypt. Securely."
            typingSpeed={50}
            pauseAfterTyped={1000}
            glitchDuration={900}
            glitchInterval={60}
            pauseBetweenWords={700}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 max-w-2xl text-lg text-gray-400"
        >
          Protect your files with AES-256 encryption. Share safely through
          HashKrypt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <Button variant="glitch" size="lg">
            Start Encrypting
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
