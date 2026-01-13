"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function SectionHero() {
  const router = useRouter();

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black text-white">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black" />
      </div>

      
      
      {/* MAIN CONTENT */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pt-32 md:px-12 md:pb-16 lg:px-16">
        <div className="flex h-full flex-col">
            
            {/* Spacer agar text tidak terlalu atas */}
            <div className="h-40 md:h-32"></div>

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
            <div className="flex flex-col-reverse gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between md:border-none md:pt-0">
                
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
                    className="max-w-md text-base leading-relaxed text-zinc-300 md:text-right md:text-lg"
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