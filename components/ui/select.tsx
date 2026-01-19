"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({ options, value, placeholder = "Select option", onChange, className }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);

  // Logic: Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setIsOpen(false);
    if (onChange) onChange(option.value);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-none border bg-zinc-950/50 px-4 py-3 text-sm transition-all duration-300",
          isOpen 
            ? "border-blue ring-1 ring-blue/50" 
            : "border-blue/30 hover:border-blue",
          selected ? "text-white" : "text-zinc-500"
        )}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-blue" />
        </motion.div>
      </button>

      {/* DROPDOWN LIST */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-md border border-blue/30 bg-black/90 backdrop-blur-xl shadow-[0_0_20px_rgba(0,64,255,0.15)]"
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-center px-4 py-3 text-sm transition-colors text-left",
                    selected?.value === option.value
                      ? "bg-blue/20 text-blue font-medium"
                      : "text-zinc-300 hover:bg-blue/10 hover:text-white"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}