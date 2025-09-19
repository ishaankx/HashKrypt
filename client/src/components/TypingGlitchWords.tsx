"use client";

import React, { useEffect, useState } from "react";

const HEX_CHARS = "0123456789abcdef";
const RAND_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>/?\\|";

function randChar() {
  const pool = Math.random() > 0.6 ? RAND_CHARS : HEX_CHARS;
  return pool[Math.floor(Math.random() * pool.length)];
}
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

interface TypingGlitchWordsProps {
  text: string;
  typingSpeed?: number;
  pauseAfterTyped?: number;
  glitchDuration?: number;
  glitchInterval?: number;
  pauseBetweenWords?: number;
  glitchChance?: number; // 👈 probability of a character glitching
}

export default function TypingGlitchWords({
  text = "Encrypt. Share. Decrypt. Securely.",
  typingSpeed = 50,
  pauseAfterTyped = 1000,
  glitchDuration = 800,
  glitchInterval = 60,
  pauseBetweenWords = 600,
  glitchChance = 0.3, // default 30%
}: TypingGlitchWordsProps) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const [glitchChars, setGlitchChars] = useState<string[]>([]);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [fadePhase, setFadePhase] = useState<"normal" | "fade-out" | "fade-in">(
    "normal"
  );

  // blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 520);
    return () => clearInterval(t);
  }, []);

  // typing + glitching logic
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setTypedIndex(0);
        setFadePhase("fade-in");
        await sleep(200);

        // TYPE OUT
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return;
          setTypedIndex(i);
          await sleep(typingSpeed);
        }

        await sleep(pauseAfterTyped);

        // split into words
        const words = text.split(" ");

        // GLITCH EACH WORD
        for (let w = 0; w < words.length; w++) {
          if (cancelled) return;
          setGlitchIndex(w);

          const original = words[w];
          const start = Date.now();

          while (Date.now() - start < glitchDuration) {
            if (cancelled) return;

            // glitch only some chars
            const chars = Array.from(original).map((ch) =>
              Math.random() < glitchChance ? randChar() : ch
            );

            setGlitchChars(chars);
            await sleep(glitchInterval);
          }

          // restore
          setGlitchIndex(null);
          setGlitchChars([]);
          await sleep(pauseBetweenWords);
        }

        // fade out + restart
        setFadePhase("fade-out");
        await sleep(400);
        setTypedIndex(0);
        setFadePhase("fade-in");
        await sleep(200);
        if (!cancelled) run();
      } catch (err) {
        console.error("TypingGlitchWords error:", err);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [
    text,
    typingSpeed,
    pauseAfterTyped,
    glitchDuration,
    glitchInterval,
    pauseBetweenWords,
    glitchChance, // ✅ stable dependency array
  ]);

  const fullTyped = text.slice(0, typedIndex);
  const splitWords = fullTyped.split(/(\s+)/);

  return (
    <span
      aria-live="polite"
      className={`inline-block transition-opacity duration-500 ${
        fadePhase === "fade-out"
          ? "opacity-0"
          : fadePhase === "fade-in"
          ? "opacity-100"
          : ""
      }`}
    >
      {splitWords.map((word, idx) => {
        if (word.trim() === "") {
          return <span key={`space-${idx}`}>{word}</span>;
        }

        if (
          glitchIndex !== null &&
          text.split(" ")[glitchIndex] === word.trim()
        ) {
          return (
            <span key={`glitch-${idx}`} className="inline-block">
              {glitchChars.map((ch, i) => {
                const isGlitched = ch !== word.trim()[i]; // glitched if replaced with randChar
                const isBlack =
                  i === Math.floor(Math.random() * glitchChars.length);

                return (
                  <span
                    key={i}
                    className={`${isGlitched ? "font-mono" : "font-matrix"} ${
                      isBlack ? "text-black" : "text-[#39ff14]"
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
              {word.endsWith(" ") ? " " : ""}
            </span>
          );
        }

        return <span key={`word-${idx}`}>{word}</span>;
      })}

      {/* cursor */}
      <span
        className="ml-1 inline-block"
        style={{
          width: 6,
          height: "1em",
          background: "currentColor",
          borderRadius: 2,
          marginLeft: 6,
          opacity: cursorBlink ? 1 : 0,
        }}
      />
    </span>
  );
}
