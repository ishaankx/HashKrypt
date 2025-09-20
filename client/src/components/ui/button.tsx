"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import GlitchText from "@/components/ui/GlitchText";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-gradient-to-r from-[var(--brand-light)] to-[var(--brand-dark)] text-white shadow-md hover:shadow-lg focus-visible:scale-[0.98]",
        rect: "rounded-md bg-white text-black shadow-md hover:shadow-lg focus-visible:scale-[0.98]",
        secondary:
          "rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg",
        outline:
          "rounded-full border border-brand-dark text-brand-dark bg-white hover:bg-brand-light/10",
        glitch: "rounded-md text-black shadow-md transition-all duration-300", // 👈 keep neutral
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  glitchText?: string;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  glitchText,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const [glitching, setGlitching] = React.useState(false);

  const handleEnter = () => {
    if (variant === "glitch") {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 1200); // full glitch duration
    }
  };

  const handleLeave = () => {
    setGlitching(false); // instant reset if leave early
  };

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        variant === "glitch" ? (glitching ? "bg-black " : "bg-white") : ""
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {variant === "glitch" && typeof children === "string" ? (
        <GlitchText text={glitchText || children} glitching={glitching} />
      ) : (
        children
      )}
    </Comp>
  );
}
