"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; href: string }[];
}

// Animasi Backdrop (Layar gelap di belakang menu)
const backdropVars : Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { delay: 0.2, duration: 0.3 } },
};

// Animasi Menu Panel (Slide Turun dari Atas)
const menuVars: Variants = {
  initial: { y: "-100%" },
  animate: {
    y: "0%",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 30,
    },
  },
  exit: {
    y: "-100%",
    transition: { ease: "easeInOut", duration: 0.3 },
  },
};

// Animasi Link (Muncul satu per satu)
const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.05 } },
  animate: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
};

const linkVars: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP (Overlay Gelap) */}
          <motion.div
            variants={backdropVars}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
          />

          {/* MENU PANEL (Half Screen) */}
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 right-0 z-[999] flex flex-col bg-[#050505] border-b border-white/10 rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                {/* Logo */}
                <Link href="/" onClick={onClose} className="relative h-9 w-28 md:w-32 flex items-center">
                    <div className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">
                        singabyte<span className="text-blue">.</span>
                    </div>
                </Link>

               <button 
                  onClick={onClose}
                  className="group flex items-center justify-center w-10 h-10 rounded-full border border-blue/50 bg-white/5 hover:bg-white/10 transition-all"
               >
                  <X className="w-5 h-5 text-blue group-hover:text-white transition-colors" />
               </button>
            </div>

            {/* Content Container */}
            <div className="flex flex-col px-6 pb-10">
                
                {/* Navigation Links */}
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-center gap-2 mt-2"
                >
                  {items.map((link, index) => (
                    <div key={index} className="overflow-hidden">
                      <motion.div variants={linkVars}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-3 border-b border-white/5 group"
                        >
                          <span className="text-2xl font-medium text-zinc-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                            {link.name}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 pt-4"
                >
                    <Link href="/contact" onClick={onClose} className="block w-full">
                        <Button variant="primary" className="w-full">
                            start a project
                        </Button>
                    </Link>
                </motion.div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}