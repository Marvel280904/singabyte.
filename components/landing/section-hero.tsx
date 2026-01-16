"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function SectionHero() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[90dvh] min-h-[600px] overflow-hidden bg-black text-white">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-80 object-[65%] md:object-center"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute -inset-1 bg-gradient-to-b from-black/40 via-black/20 to-black z-10" />
      </div>

      
      
      {/* MAIN CONTENT */}
      <div className="absolute inset-0 z-20 flex h-full w-full flex-col px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
        <div className="flex flex-grow flex-col justify-end">

            {/* Title */}
            <div className="mb-0 md:mb-2 max-w-4xl">
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-display font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-2xl"
                >
                    We build custom <br />
                    software that helps <br />
                    businesses grow
                </motion.h1>
            </div>

            {/* Bottom Content (Buttons & Description) */}
            <div className="flex flex-col-reverse pt-3 lg:flex-row lg:items-end lg:justify-between lg:border-none lg:pt-0">
                
                {/* Bottom Left: Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button variant="primary" onClick={() => router.push('/contact')} className="h-12 px-8 text-base">
                        start a project
                    </Button>
                    <Button variant="secondary" onClick={() => router.push('/#work')} className="h-12 px-8 text-base">
                        view our work
                    </Button>
                </motion.div>

                {/* Bottom Right: Subtitle */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="max-w-md text-base leading-relaxed text-zinc-300 pb-4 lg:pb-0 lg:text-right md:text-lg"
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