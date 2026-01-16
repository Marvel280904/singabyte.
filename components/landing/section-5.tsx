"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// DATA FAQ 
const faqs = [
  {
    question: "What types of clients do you work with?",
    answer: "We work with startups, SMEs, and enterprises across various industries, including finance, healthcare, government, and SaaS.",
  },
  {
    question: "Do you only work with clients in Singapore?",
    answer: "While we are primarily based in Singapore, we are fully open to collaborating with clients globally and have the infrastructure to support international projects remotely.",
  },
  {
    question: "What services does Singabyte provide?",
    answer: "We offer a comprehensive suite of digital solutions, including custom software development, web and mobile application design, cloud infrastructure setup, AI integration, and digital transformation consulting.",
  },
  {
    question: "What technologies do you use?",
    answer: "Our team utilizes a modern and scalable tech stack tailored to each project's needs. This includes frameworks like React, Node.js, and Flutter, as well as robust backend languages such as Python and Go, supported by cloud providers like AWS, Azure, and Google Cloud.",
  },
  {
    question: "Can you support products after launch?",
    answer: "Yes, we provide dedicated post-launch support and maintenance packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements to ensure your product continues to grow with your business.",
  },
];

export default function SectionFive() {
  // State untuk mengelola accordion mana yang aktif
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default buka yang pertama

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black py-24 md:py-32 border-t border-white/5" id="insights">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* GRID LAYOUT (2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-20">
            
            {/* LEFT SIDE: HEADER (Sticky) */}
            <div className="lg:col-span-5">
                <div className="md:sticky top-32">
                    
                    {/* Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6"
                    >
                        <span className="text-sm font-medium text-zinc-400">
                            [ FAQ ]
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-white leading-[1.1] mb-3 lg:mb-6"
                    >
                        Answers to your queries.
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg leading-relaxed mb-6 max-w-md"
                    >
                        Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
                    </motion.p>
                </div>
            </div>


            {/* RIGHT SIDE: ACCORDION LIST */}
            <div className="lg:col-span-7">
                <div className="flex flex-col">
                    {faqs.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            // Border bawah untuk setiap item, kecuali yang terakhir
                            className="border-b border-white/10 last:border-none"
                        >
                            <button 
                                onClick={() => toggleAccordion(index)}
                                className="flex w-full items-start justify-between py-5 text-left group"
                            >
                                {/* Question Title */}
                                <span className={cn(
                                    "text-xl md:text-2xl font-medium transition-colors pr-8",
                                    activeIndex === index ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                                )}>
                                    {item.question}
                                </span>

                                {/* Icon Plus/Minus */}
                                <div className="relative flex-shrink-0 mt-1">
                                    <motion.div
                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeIndex === index ? (
                                            <Minus className="h-6 w-6 text-blue" /> 
                                        ) : (
                                            <Plus className="h-6 w-6 text-zinc-600 group-hover:text-white transition-colors" />
                                        )}
                                    </motion.div>
                                </div>
                            </button>

                            {/* Answer Content */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 text-base md:text-lg text-zinc-400 leading-relaxed max-w-[95%]">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}