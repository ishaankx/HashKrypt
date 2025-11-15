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

import { useRouter } from "next/navigation";

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  // inside your Home() component (keep existing imports + "use client")
  const [ctaLoading, setCtaLoading] = useState(false);
  const [ctaAnim, setCtaAnim] = useState(false);

  // Prefetch signup route on mount for faster navigation
  useEffect(() => {
    // router.prefetch exists in next/navigation; safe to call inside client component
    try {
      router.prefetch("/signup");
    } catch (e) {
      // ignore if not available or in dev
    }
  }, [router]);

  async function handleStart() {
    if (ctaLoading) return; // guard
    setCtaLoading(true);

    try {
      // optional analytics (fire-and-forget)
      try {
        // analytics.track("clicked_start", { source: "marketing_hero" });
      } catch (err) {
        // non-blocking: ignore analytics errors
      }

      // micro-animation: toggle a class for 180-220ms to give a tactile response
      setCtaAnim(true);
      await new Promise((r) => setTimeout(r, 200));

      // navigate to signup
      router.push("/signup");
    } finally {
      // small safety fallback, though router.push will unmount this component
      setCtaLoading(false);
      setCtaAnim(false);
    }
  }

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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0a0a0a] to-black opacity-90" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[35vw] h-[25vw] bg-[#39ff14]/20 rounded-full blur-3xl opacity-55" />
        {/* --- HERO LAYER: neon glows (placed BEFORE content) --- */}
        {/* Large soft radial (main neon spot) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            className="w-[60vw] h-[60vw] max-w-[1200px] max-h-[1200px] rounded-full filter blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(57,255,20,0.10) 0%, rgba(57,255,20,0.05) 6%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        {/* Secondary accent glows (optional; add depth) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="absolute top-24 left-1/4 w-[28vw] h-[28vw] max-w-[520px] max-h-[520px] rounded-full blur-2xl pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(57,255,20,0.05), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.45, duration: 1.3 }}
          className="absolute bottom-12 right-1/5 w-[20vw] h-[20vw] max-w-[420px] max-h-[420px] rounded-full blur-2xl pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,120,0.03), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />

        {/* --- HERO CONTENT: keep as-is but ensure it has higher z-index --- */}
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
        <div className="relative z-10 flex flex-col items-center -mt-28">
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
            <Button
              variant="glitch"
              size="lg"
              onClick={handleStart}
              className={`w-full sm:w-auto transform transition-transform duration-150 ${
                ctaAnim ? "scale-95" : "scale-100"
              } ${ctaLoading ? "opacity-80 pointer-events-none" : ""}`}
              aria-label="Start Encrypting — create an account"
            >
              {ctaLoading ? "Start Encrypting" : "Start Encrypting"}
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
        viewport={{
          once: false,
          amount:
            typeof window !== "undefined" && window.innerWidth < 768
              ? 0.1
              : 0.4,
        }}
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
          {/* Upload */}
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-md group overflow-hidden hover:shadow-[#39ff14]/40 transition">
            <CloudArrowUpIcon className="w-14 h-14 text-[#39ff14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">Upload</h3>
            <p className="text-gray-400">
              Select any file type and prepare it for secure transfer with one
              click.
            </p>
          </motion.article>

          {/* Encrypt */}
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-md group overflow-hidden hover:shadow-[#39ff14]/40 transition">
            <LockClosedIcon className="w-14 h-14 text-[#39ff14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">Encrypt</h3>
            <p className="text-gray-400">
              AES-256 encryption happens instantly in your browser. No plaintext
              leaves your device.
            </p>
          </motion.article>

          {/* Share & Decrypt */}
          <motion.article className="relative bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl p-10 text-center shadow-md group overflow-hidden hover:shadow-[#39ff14]/40 transition">
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
      {/* Trust Section */}
      <motion.section
        id="trust"
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0d0d0d] text-white px-12 py-20 overflow-hidden"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        {/* Neon backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-[#0f0f0f] to-[#0d0d0d]" />
        <div className="absolute right-20 top-1/3 w-[35vw] h-[35vw] bg-[#39ff14]/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute left-10 bottom-20 w-[20vw] h-[20vw] bg-emerald-400/10 rounded-full blur-2xl opacity-40" />

        {/* Left side: Content */}
        <div className="flex-1 max-w-2xl md:pr-12 mb-12 md:mb-0">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#39ff14] via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Trust & Credibility
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            At <span className="text-[#39ff14] font-semibold">HashKrypt</span>,
            we put <span className="text-[#39ff14]">privacy first</span>. Every
            file is encrypted locally with{" "}
            <span className="text-[#39ff14]">AES-256</span>, ensuring no
            plaintext ever leaves your device. We never store, read, or analyze
            your data — control stays entirely with{" "}
            <span className="text-[#39ff14]">you</span>.
          </p>
          <p className="text-gray-400 text-base leading-relaxed">
            Our systems are <span className="text-[#39ff14]">open-source</span>{" "}
            and continuously <span className="text-[#39ff14]">audited</span> by
            the security community. With{" "}
            <span className="text-[#39ff14]">zero-knowledge design</span>,
            regulatory compliance (GDPR-ready), and{" "}
            <span className="text-[#39ff14]">
              enterprise-grade cryptography
            </span>
            , HashKrypt offers both individuals and organizations the highest
            level of trust.
          </p>
        </div>

        {/* Right side: Futuristic feature badges */}
        <div className="flex-1 grid grid-cols-1 gap-8 max-w-md">
          {/* Card 1 */}
          <div className="relative bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-[#39ff14]/40 transition">
            <div className="flex items-center space-x-4">
              <ShieldCheckIcon className="w-10 h-10 text-[#39ff14]" />
              <h3 className="text-xl font-semibold text-white">
                Privacy First
              </h3>
            </div>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Zero-knowledge architecture. Only you and your recipients hold the
              decryption keys.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-[#39ff14]/40 transition">
            <div className="flex items-center space-x-4">
              <CheckBadgeIcon className="w-10 h-10 text-[#39ff14]" />
              <h3 className="text-xl font-semibold text-white">
                Audited & Open
              </h3>
            </div>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Open-source cryptography, verified by independent researchers and
              global security experts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-[#39ff14]/40 transition">
            <div className="flex items-center space-x-4">
              <LockClosedIcon className="w-10 h-10 text-[#39ff14]" />
              <h3 className="text-xl font-semibold text-white">
                Enterprise Ready
              </h3>
            </div>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Strong AES-256 encryption, GDPR-compliant, and trusted by privacy
              communities and businesses worldwide.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
