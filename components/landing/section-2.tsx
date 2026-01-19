"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Button } from "../ui/button";
import InfiniteCarousel from "../ui/carousel";
import { projectsData } from "@/config/projects-data";

// Animation Variants
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
  const router = useRouter();
  // State untuk generate bintang secara random
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
    <section className="w-full bg-black py-20 overflow-hidden min-h-[700px] lg:min-h-[900px] flex flex-col justify-center" id="work">
      
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
                }}
            />
        ))}
      </div>

      <div className="relative z-10 w-full">
        
        {/* Header Section */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-0 lg:mb-12 px-6"
        >
            <motion.div variants={fadeUp} className="inline-block mb-4 text-md font-medium text-zinc-400">
                [ our works ]
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-display font-semibold leading-tight text-white md:text-5xl">
                Delivering Impact <br />
                <span className="text-zinc-500">Through Technology.</span>
            </motion.h2>
        </motion.div>

        {/* MAIN CONTENT - CAROUSEL ONLY */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full relative overflow-hidden flex items-center min-h-[400px]"
        >
            {/* Fade Gradients for Edges */}
            <div className="absolute left-0 top-0 bottom-0 z-10 w-10 md:w-20 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 z-10 w-10 md:w-20 bg-gradient-to-l from-black via-black/80 to-transparent" />
            
            {/* Carousel Full Width */}
            <InfiniteCarousel items={projectsData} />
        </motion.div>

        {/* Bottom: Centered Button */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-0 lg:mt-12 flex justify-center px-6"
        >
             <Button variant="primary" onClick={() => router.push('/projects')}>
                view all projects
             </Button>
        </motion.div>

      </div>
    </section>
  );
}