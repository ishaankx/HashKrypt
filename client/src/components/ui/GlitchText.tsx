"use client";

import React, { useEffect, useState } from "react";

const GLITCH_CHARS = "0123456789abcdef!@#$%^&*";

function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

interface GlitchTextProps {
  text: string;
  glitching: boolean; // 👈 controlled by Button
  glitchDuration?: number;
}

export default function GlitchText({
  text,
  glitching,
  glitchDuration = 1200,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (glitching) {
      interval = setInterval(() => {
        const glitched = text
          .split("")
          .map((ch) => (Math.random() < 0.25 ? randChar() : ch)) // 25% chars glitch
          .join("");
        setDisplay(glitched);
      }, 60);

      timeout = setTimeout(() => {
        setDisplay(text); // reset text
      }, glitchDuration);
    } else {
      setDisplay(text); // reset immediately when not glitching
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [glitching, text, glitchDuration]);

  return (
    <span
      className={`relative inline-block font-poppins transition-colors duration-200 ${
        glitching ? "text-[#39ff14]" : "text-black"
      }`}
      style={{
        width: `${text.length * 0.75}ch`, // lock width
        display: "inline-block",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {/* Ghost placeholder */}
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">{display}</span>
    </span>
  );
}
