import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins, Orbitron } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import NavBar from "@/components/NavBar"; // 👈 client navbar with usePathname
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HashKrypt",
  description: "Encrypt. Share. Decrypt. Securely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${poppins.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased bg-black text-white">
        {/* Background Parallax */}
        <div className="parallax-bg" id="parallax-bg" />

        <SmoothScroll>
          {/* Header */}
          <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur z-50 text-white shadow-sm">
            <div className="relative flex w-full items-center justify-between px-8 py-4">
              {/* Logo → always returns home */}
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/HK-Logo-V2.svg"
                  alt="HashKrypt Logo"
                  width={40}
                  height={40}
                  priority
                />
                <h1 className={`${orbitron.className} text-2xl`}>HashKrypt</h1>
              </Link>

              {/* Centered NavBar */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <NavBar />
              </div>

              {/* Get Started Button */}
              <Button variant="rect" className={`${poppins.className} ml-auto`}>
                Get Started
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 pt-24">{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
