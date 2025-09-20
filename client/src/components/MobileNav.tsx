"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "How It Works", href: "/how-it-works", icon: LightBulbIcon },
    { name: "Features", href: "/features", icon: PuzzlePieceIcon },
    { name: "Pricing", href: "/pricing", icon: CurrencyDollarIcon },
  ];

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent background scrolling when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Click outside closes
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (overlayRef.current && !overlayRef.current.contains(target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="flex items-center justify-between w-full md:hidden">
      {/* Hamburger - top-left */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-md hover:bg-white/5 transition"
      >
        {open ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Center small logo + text */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/HK-V2.png"
          alt="HashKrypt"
          width={28}
          height={28}
          priority
        />
        <span className="font-semibold text-base">HashKrypt</span>
      </Link>

      {/* Smaller Mobile Get Started */}
      <Button
        variant="rect"
        className="px-2.5 py-1 text-xs font-medium rounded-md"
        asChild
      >
        <Link href="/get-started">Get Started</Link>
      </Button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 mobile-popover-backdrop"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* Popover */}
      <div
        ref={overlayRef}
        className={`fixed z-50 left-4 top-16 w-50 mobile-popover transform origin-top-left ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-gray-950/95 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-200 hover:text-[#39ff14] transition"
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#39ff14]" />
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
