"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // smoothness (higher = slower)
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true, // enable smooth scroll for wheel/trackpad
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 👇 Force page to start at top (prevents Lenis jump on load)
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
