// app/(marketing)/layout.tsx  (server component)
import Image from "next/image";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import NavBar from "@/components/NavBar"; // client navbar (desktop)
import MobileNav from "@/components/MobileNav"; // mobile header
// note: removed cookies/redirect imports and removed globals.css import

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col antialiased bg-black text-white">
      {/* Background Parallax */}
      <div className="parallax-bg" id="parallax-bg" />

      <SmoothScroll>
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur  text-white z-50 shadow-sm">
          <div className="relative flex w-full items-center justify-between px-4 md:px-8 py-4">
            {/* Mobile header (hamburger + center logo + mobile get-started) */}
            <div className="w-full md:hidden">
              <MobileNav />
            </div>

            {/* Desktop Logo (left) - hidden on mobile */}
            <Link href="/" className="hidden md:flex items-center space-x-1">
              <Image
                src="/HK-V2.png"
                alt="HashKrypt Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="text-2xl font-bold">HashKrypt</h1>
            </Link>

            {/* Centered NavBar (desktop only) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <NavBar />
            </div>

            {/* Get Started Button (desktop only) */}
            <Button
              variant="rect"
              className="ml-auto hidden md:inline-flex"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 pt-24">{children}</main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </div>
  );
}
