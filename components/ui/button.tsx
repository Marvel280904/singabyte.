"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = ({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex h-12 items-center justify-center gap-2 px-6 font-display font-medium transition-all duration-300 active:scale-95 text-sm md:text-base";
  
  const variants = {
    primary: "bg-blue hover:bg-[#0033CC] text-white",
    secondary: "bg-black/40 border border-white/10 hover:bg-black/60 text-white backdrop-blur-sm",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="mr-2 opacity-70">[</span>
      {children}
      <span className="ml-2 opacity-70">]</span>
    </motion.button>
  );
};