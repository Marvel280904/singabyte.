"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = ["Services", "Work", "Solution", "Insights", "Contact"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Logic cek scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 20;
    const scrolled = latest > threshold;
    if (isScrolled !== scrolled) {
      setIsScrolled(scrolled);
    }
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 md:py-3"
    >
      <div
        className={cn(
          // Base Style
          "relative w-[95%] max-w-7xl flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 ease-in-out",
          isScrolled
            // Scrolled (GLASS EFFECT)
            ? "mt-3 bg-black/20 backdrop-blur-sm border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            // not-Scrolled
            : "bg-transparent border border-transparent shadow-none backdrop-blur-none"
        )}
      >
        
        {/* Left Side: Hamburger (Mobile) & Logo */}
        <div className="flex items-center gap-3 justify-start">
            {/* Mobile Hamburger */}
            <button className="text-white md:hidden mt-1">
                 <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="relative h-9 w-28 md:w-32 flex items-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">
                    singabyte<span className="text-blue">.</span>
                </div>
            </Link>
        </div>


        {/* Center Part: Nav (DESKTOP ONLY) */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
            {navItems.map((item, index) => (
                <Link
                key={index}
                href={`#${item.toLowerCase()}`}
                className="relative group text-md font-medium text-zinc-400 transition-colors hover:text-white"
                >
                    {item}
                    {/* Span Garis Neon */}
                    <span className={cn(
                        "absolute -bottom-3 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 ease-out",
                        "bg-blue shadow-blue-up",
                        "w-0 group-hover:w-full"
                    )} />
                </Link>
            ))}
        </nav>


        {/* Right Side: Button */}
        <div className="flex items-center justify-end">
            <Button variant="primary" className="h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm">
                start a project
            </Button>
        </div>
        
      </div>
    </motion.header>
  );
}