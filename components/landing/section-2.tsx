"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "../ui/button";
import InfiniteCarousel, { Project } from "../ui/carousel";

// Data Dummy
const projects: Project[] = [
  {
    id: 1,
    title: "Renotake Web App",
    category: "AI PropTech",
    description: "An AI-powered platform designed to empower homeowners with accurate renovation cost estimates and intelligent budget planning. It streamlines the home improvement journey by analyzing project requirements to provide transparent financial projections.",
    image: "/images/project-3.png", 
    stats: [
        { label: "Timeline", value: "Ongoing" },
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" },
    ]
  },
  {
    id: 2,
    title: "Essen Web App",
    category: "E-Commerce Website",
    description: "A comprehensive e-commerce platform offering a curated collection of premium home furnishings, including beds, lighting, and seating. The site delivers a seamless shopping experience with intuitive navigation designed to elevate modern living spaces.",
    image: "/images/project-2.png",
    stats: [
        { label: "Timeline", value: "1 Months" },
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" },
    ]
  },
  {
    id: 3,
    title: "E-Commerce Analytics",
    category: "Web Platform",
    description: "Comprehensive dashboard for tracking sales metrics, inventory management, and customer behavior analysis.",
    image: "/images/project-1.png",
    stats: [
        { label: "Timeline", value: "4 Months" },
        { label: "Role", value: "Frontend" },
        { label: "Tech", value: "Vue.js" },
    ]
  },
  {
    id: 4,
    title: "HealthCare System",
    category: "Enterprise Software",
    description: "HIPAA-compliant patient management system designed to improve hospital efficiency and patient care coordination.",
    image: "/images/project-1.png",
    stats: [
        { label: "Timeline", value: "1 Year" },
        { label: "Role", value: "Backend" },
        { label: "Tech", value: "GoLang" },
    ]
  },
  {
    id: 5,
    title: "Crypto Exchange",
    category: "Blockchain",
    description: "High-frequency trading platform built on blockchain technology ensuring transparency and low-latency execution.",
    image: "/images/project-1.png", 
    stats: [
        { label: "Timeline", value: "8 Months" },
        { label: "Role", value: "Smart Contract" },
        { label: "Tech", value: "Solidity" },
    ]
  },
];

// Animation Variants (Agar kode lebih rapi)
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function SectionTwo() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // State untuk generate bintang secara random di client-side agar tidak mismatch
  const [stars, setStars] = useState<{ top: string; left: string; delay: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    // Generate 40 bintang random
    const newStars = Array.from({ length: 40 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `delay-${[75, 100, 150, 200, 300, 500, 700, 1000][Math.floor(Math.random() * 8)]}`,
      size: Math.random() > 0.5 ? 'h-1 w-1' : 'h-0.5 w-0.5',
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(newStars);
  }, []);

  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden min-h-[900px] flex flex-col justify-center">
      
      {/* Background Grid Subtle */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Shining Stars / Dots (Generated Randomly) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
            <div
                key={i}
                className={`absolute rounded-full bg-purple-200 animate-twinkle ${star.delay} ${star.size}`}
                style={{ 
                    top: star.top, 
                    left: star.left,
                    boxShadow: '0 0 4px 1px rgba(155, 61, 243, 0.4)' // Purple glow pada bintang
                }}
            />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:pr-12">
        
        {/* Header Section */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-2"
        >
            <motion.div variants={fadeUp} className="inline-block mb-4 text-md font-medium text-zinc-400">
                [ our works ]
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-display font-semibold leading-tight text-white md:text-5xl">
                Delivering Impact <br />
                <span className="text-zinc-500">Through Technology.</span>
            </motion.h2>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-[600px]"
        >
            
            {/* LEFT SIDE: DETAILS PANEL */}
            <div className="lg:col-span-4 h-full relative flex items-center">
                <AnimatePresence mode="wait">
                    {selectedProject ? (
                        <motion.div
                            key={selectedProject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full flex flex-col gap-6"
                        >
                            {/* Decorative Line */}
                            <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue to-transparent opacity-50 hidden lg:block shadow-blue-neon" />
                            
                            {/* Category Badge */}
                            <div className="flex items-center gap-2 text-blue text-sm font-bold uppercase tracking-wider">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
                                {selectedProject.category}
                            </div>

                            {/* Title */}
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                {selectedProject.title}
                            </h3>

                            {/* Description */}
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {selectedProject.description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6 mt-2">
                                {selectedProject.stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-xs text-zinc-500 uppercase">{stat.label}</span>
                                        <span className="text-sm font-medium text-white">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        /* EMPTY STATE */
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full flex flex-col justify-center h-full text-white space-y-4 border-l border-zinc-900 pl-6"
                        >
                            <h3 className="text-3xl font-display font-semibold">
                                Explore our portfolio
                            </h3>
                            <p className="max-w-sm text-zinc-500">
                                Select a project from the carousel on the right to view details, tech stack, and impact.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: 48 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="h-[1px] bg-blue" 
                                />
                                <span className="text-xs text-blue uppercase tracking-widest">Select Project</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT SIDE: CAROUSEL */}
            <div className="lg:col-span-8 w-full h-full overflow-hidden mx-auto flex items-center">
                <InfiniteCarousel 
                    items={projects} 
                    selectedId={selectedProject?.id || null}
                    onSelect={(project) => setSelectedProject(project)}
                />
            </div>

        </motion.div>

        {/* Bottom Centered Button */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
        >
             <Button variant="primary">
                view all projects
             </Button>
        </motion.div>

      </div>
    </section>
  );
}