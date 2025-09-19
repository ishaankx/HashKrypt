"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List
        className={`flex items-center space-x-8 ${poppins.className}`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavigationMenu.Item key={item.href}>
              <Link
                href={item.href}
                className={`relative hover:text-[#39ff14] transition ${
                  isActive ? "text-[#39ff14]" : ""
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#39ff14] shadow-[0_0_8px_#39ff14] animate-pulse" />
                )}
              </Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
