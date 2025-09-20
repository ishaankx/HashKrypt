"use client";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Variants for different routes
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5, ease: easeInOut }, // ✅ imported easing fn
    },
    slide: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.6, ease: easeInOut }, // ✅ imported easing fn
    },
  };

  // Pick fade for "/" and slide for others
  const chosen = pathname === "/" ? variants.fade : variants.slide;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={chosen.initial}
        animate={chosen.animate}
        exit={chosen.exit}
        transition={chosen.transition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
