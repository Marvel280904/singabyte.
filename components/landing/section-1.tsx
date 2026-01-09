"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import BouncyCards from "../ui/bouncy-cards";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Product Design",
    description: "We design intuitive, user-centered experiences that align business goals with real user needs.",
    tags: "UI/UX Design · Prototyping · Design Systems",
    isOpenDefault: true
  },
  {
    title: "Custom Web & Mobile Development",
    description: "Building high-performance, scalable web and mobile applications tailored to your specific business requirements.",
    tags: "Web Apps · Mobile Apps · SaaS Platforms",
    isOpenDefault: false
  },
  {
    title: "Cloud, DevOps & Support",
    description: "Ensure your infrastructure is secure, scalable, deployed, and automated with our comprehensive DevOps services.",
    tags: "Cloud Infrastructure · DevOps · Ongoing Maintenance",
    isOpenDefault: false
  }
];

export default function SectionOne() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black md:py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-2 lg:px-2">
        
        {/* Grid Layout: Desktop (2 cols), Mobile (1 col) */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-24">
          
          {/* LEFT SIDE: BOUNCY BLOCKS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] w-full lg:h-[600px]"
          >
            <BouncyCards />
          </motion.div>


          {/* RIGHT SIDE: CONTENT & ACCORDION */}
          <div className="flex flex-col justify-center">
            
            {/* Badge */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="mb-6 text-md font-medium text-zinc-400"
            >
               [ what we do ]
            </motion.div>

            {/* Title */}
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="mb-6 md:mb-12 text-4xl font-display font-semibold leading-tight md:text-5xl"
            >
              End-to-end Software <br />
              Development.
            </motion.h2>

            {/* Accordion Container */}
            <div className="flex flex-col gap-6">
              {services.map((item, index) => (
                <div 
                  key={index} 
                  className="border-b border-white/10 md:pb-6 last:border-none"
                >
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between py-2 text-left group"
                  >
                    <span className={cn(
                        "text-xl font-medium transition-colors md:text-2xl",
                        activeIndex === index ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                    )}>
                      {item.title}
                    </span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4"
                    >
                      {activeIndex === index ? (
                        <Minus className="h-6 w-6 text-blue" />
                      ) : (
                        <Plus className="h-6 w-6 text-white" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-base text-zinc-400 leading-relaxed max-w-[90%]">
                          {item.description}
                          <div className="mt-4 text-sm font-medium text-zinc-500">
                            {item.tags}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}