"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

// --- SUB-COMPONENT: SPOTLIGHT CARD WITH CORNER FRAME ---
const ServiceCard = ({
  badge,
  title,
  description,
  index,
}: {
  badge: string;
  title: string;
  description: string;
  index: number;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const [stars, setStars] = useState<{ top: string; left: string; size: string; opacity: number }[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: 8 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.5 ? 'h-1 w-1' : 'h-0.5 w-0.5',
      opacity: Math.random() * 1 + 0.2
    }));
    setStars(newStars);
  }, []);

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-zinc-900/40 overflow-hidden" 
    >
      
      {/* FRAME */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Frame container: Opacity 50% di awal, 100% saat hover + Glow */}
        <div className="absolute inset-0 transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
            
            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 h-6 w-6 border-l-2 border-t-2 border-purple" />
            
            {/* Top Right Corner */}
            <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-purple" />
            
            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-purple" />
            
            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-purple" />
        
        </div>
      </div>


      {/* SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      

      {/* CONTENT CONTAINER */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        
        {/* Background Stars */}
        <div className="absolute inset-0 pointer-events-none">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full bg-purple transition-opacity duration-700 group-hover:animate-pulse ${star.size}`}
                    style={{
                        top: star.top,
                        left: star.left,
                        opacity: star.opacity
                    }}
                />
            ))}
        </div>

        {/* Top Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple"></span>
            </span>
            <span className="text-xs font-bold text-purple uppercase tracking-widest">
              {badge}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white leading-snug mb-4 group-hover:text-purple-200 transition-colors">
            {title}
          </h3>

          <p className="text-zinc-400 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom Content */}
        <div className="mt-4 md:mt-8 pt-6 border-t border-white/20 flex flex-row items-center justify-between gap-4">
            <Button variant="primary" 
              className="h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm"
              onClick={() => router.push('/contact')}
            >
                get in touch
            </Button>
            <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                <span>Trusted by clients</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- MAIN COMPONENT ---
export default function SectionThree() {
  const services = [
    {
      id: 1,
      badge: "DISCOVERY",
      title: "Understand the problem before building the solution",
      description: "We identify the right problems to solve through in-depth research, stakeholder alignments, and rapid validation.",
    },
    {
      id: 2,
      badge: "DEVELOP",
      title: "Engineering validated concepts into resilient, scalable platforms",
      description: "We craft high-performance software using future-proof architecture and rigorous standards to ensure stability at any scale.",
    },
    {
      id: 3,
      badge: "DELIVER",
      title: "Seamless deployment and continuous product evolution",
      description: "Beyond the launch, we provide data-driven optimization and strategic support to maximize long-term ROI and user retention.",
    },
  ];

  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden" id="solution">

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"> 
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20 max-w-7xl mx-auto relative"
        >
          {/* Purple Overlay (Background Effect) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-full h-[400px] md:h-[500px] bg-purple/15 md:bg-purple/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
          
          {/* Label Baru */}
          <motion.div variants={fadeUp} className="inline-block mb-4 text-md font-medium text-zinc-400">
              [ how we create value ]
          </motion.div>

          {/* Title */}
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
              Experience across <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                  industries and use cases
              </span>
          </motion.h2>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We bring a wealth of expertise to every project, ensuring that your digital product is built to world-class standards.
          </motion.p>
        </motion.div>

        {/* GRID (Segitiga Terbalik) */}
        <div className="flex flex-col gap-6 md:gap-8">
            
          {/* ROW 1: Dua Card di Atas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
              {services.slice(0, 2).map((service, index) => (
                  <ServiceCard
                      key={service.id}
                      index={index}
                      badge={service.badge}
                      title={service.title}
                      description={service.description}
                  />
              ))}
          </div>

          {/* ROW 2: Satu Card di Bawah (Centered) */}
          <div className="flex justify-center">
              <div className="w-full md:w-[calc(50%-1rem)]"> 
                  {services.slice(2, 3).map((service, index) => (
                        <ServiceCard
                          key={service.id}
                          index={index + 2}
                          badge={service.badge}
                          title={service.title}
                          description={service.description}
                      />
                  ))}
              </div>
          </div>

        </div>

      </div>
    </section>
  );
}