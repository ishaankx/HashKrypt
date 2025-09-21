// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import MobileNav from "@/components/MobileNav";
import { Orbitron, Poppins, Share_Tech_Mono } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
const matrix = Share_Tech_Mono({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur z-50 text-white shadow-sm">
      <div className="relative flex w-full items-center justify-between px-4 md:px-8 py-4">
        {/* Mobile header */}
        <div className="w-full md:hidden">
          <MobileNav />
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex items-center space-x-1">
          <Image
            src="/HK-V2.png"
            alt="HashKrypt Logo"
            width={40}
            height={40}
            priority
          />
          <h1 className={`${orbitron.className} text-2xl`}>HashKrypt</h1>
        </Link>

        {/* Center NavBar */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <NavBar />
        </div>

        {/* Get Started Button */}
        <Button
          variant="rect"
          className={`${poppins.className} ${
            pathname === "/" ? "bg-[#39ff14] text-black" : ""
          } ml-auto hidden md:inline-flex`}
        >
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
