"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const navItems = ["Services", "Work", "Solution", "Insights", "Contact"];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-16"
    >
      {/* Left Side: Logo & Mobile Menu */}
      <div className="flex items-center gap-4 md:gap-12">
        
        {/* Mobile Hamburger (Visible only on mobile) */}
        <button className="text-white md:hidden mt-1">
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="relative h-9 w-32 md:h-10 md:w-40">
           <div className="text-3xl font-bold text-white tracking-tighter">
             singabyte<span className="text-blue">.</span>
           </div>
        </Link>

        {/* Nav Items (Desktop Only) */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-md font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Side: Button */}
      <div className="md:block">
        <Button variant="primary" className="h-10 px-3">start a project</Button>
      </div>
    </motion.header>
  );
}