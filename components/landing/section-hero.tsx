"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function SectionHero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-blue text-white">
      
      {/* Bg Image Container */}
      <div className="absolute top-0 right-0 z-0 h-full w-full md:w-[80%] lg:w-[65%]">
        <Image
          src="/images/bg-hero.png"
          alt="Singabyte Background"
          fill
          className="object-cover object-right opacity-80"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      {/* Gradient kiri ke kanan*/}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Gradient atas ke bawah*/}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/10 to-black" />
      
      {/* Glow Effect for Title */}
      <div className="absolute -left-[10%] top-[20%] z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-12 pt-32 md:px-12 md:pb-16 lg:px-16">
        <div className="flex h-full flex-col">
            
            {/* Spacer */}
            <div className="h-40 md:h-32"></div>

            {/* Title */}
            <div className="mb-0 md:mb-2 max-w-4xl">
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-display font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                    We build custom <br />
                    software that helps <br />
                    businesses grow
                </motion.h1>
            </div>

            <div className="flex flex-col-reverse gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between md:border-none md:pt-0">
                
                {/* Bottom Left: Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button variant="primary">start a project</Button>
                    <Button variant="secondary">view our work</Button>
                </motion.div>

                {/* Bottom Right: Subtitle */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="max-w-md text-base leading-relaxed text-zinc-400 md:text-right md:text-lg"
                >
                    <p>
                        Singabyte is a Singapore-based software house
                        building scalable, secure digital products for
                        startups, SMEs, and enterprises.
                    </p>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}