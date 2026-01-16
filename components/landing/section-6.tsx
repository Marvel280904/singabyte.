"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SectionSix() {
  const router = useRouter();
  
  return (
    <section className="w-full bg-black py-12 md:py-24 px-4 md:px-6 flex justify-center">
      
      {/* BANNER CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-7xl h-[500px] md:h-[450px] rounded-[1.5rem] overflow-hidden flex items-start justify-start text-start"
      >
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-banner.png"
            alt="Contact Banner"
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 my-auto md:ml-4 px-6 max-w-7xl flex flex-col items-start">
          
          {/* Logo */}
          <div className="mb-10">
            <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">
              singabyte<span className="text-blue">.</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
            Each project we undertake is a <br className="hidden md:block" />
            unique opportunity
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-200 text-md lg:text-lg max-w-2xl mb-10 leading-relaxed">
            Ready to take the next step? Join us now and start transforming your vision into reality with expert support.
          </p>

          {/* Button */}
          <Button variant="primary" onClick={() => router.push('/contact')}>
            contact us
          </Button>

        </div>

      </motion.div>
    </section>
  );
}