import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Share_Tech_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"], // choose weights you want
  variable: "--font-orbitron",
});

const matrixFont = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-matrix",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
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
      className={`${geistSans.variable} ${geistMono.variable} ${matrixFont.variable} ${orbitron.variable} ${poppins.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased bg-gradient-to-b from-black">
        <header className="w-full bg-gray-250 text-black shadow-sm">
          <div className="flex w-full items-center justify-between px-8 py-4">
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/HK-Logo-v2.png" // put this file in client/public
                alt="HashKrypt Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className={`${orbitron.className} text-2xl text-white`}>
                HashKrypt
              </h1>
            </Link>

            {/* Navigation */}
            <NavigationMenu.Root>
              <NavigationMenu.List
                className={`flex items-center space-x-8 ${poppins.className}`}
              >
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    href="#features"
                    className="text-white hover:text-brand-dark"
                  >
                    Features
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    href="#features"
                    className="text-white hover:text-brand-dark"
                  >
                    Pricing
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    href="#about"
                    className="text-white hover:text-brand-dark"
                  >
                    About
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    href="#contact"
                    className="text-white hover:text-brand-dark"
                  >
                    Contact
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>

            <Button
              variant="rect"
              className={`ml-6 flex items-center space-x-8 ${poppins.className}`}
            >
              Get Started
            </Button>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
