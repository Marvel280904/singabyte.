"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Code2, Database, Globe, Layers, Cpu, Smartphone, 
  Cloud, Terminal, ShieldCheck, Zap, Server, Box 
} from "lucide-react";

// --- DATA TECH STACK ---
const stackRow1 = [
  { name: "Next.js 14", icon: Globe },
  { name: "React Native", icon: Smartphone },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Layers },
  { name: "Framer Motion", icon: Zap },
  { name: "Node.js", icon: Server },
  { name: "GraphQL", icon: Database },
];

const stackRow2 = [
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Box },
  { name: "AWS Cloud", icon: Cloud },
  { name: "GoLang", icon: Terminal },
  { name: "Supabase", icon: Zap },
  { name: "Prisma ORM", icon: Layers },
  { name: "Redis", icon: Server },
];

// --- SUB-COMPONENT: TECH CARD ---
const TechCard = ({ name, Icon }: { name: string; Icon: any }) => {
  return (
    <div className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-blue/50 hover:bg-zinc-800/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-default">
      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-blue transition-colors duration-300" />
      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

// --- SUB-COMPONENT: MARQUEE TRACK ---
const MarqueeRow = ({ items, direction = "left", speed = 20 }: { items: typeof stackRow1, direction?: "left" | "right", speed?: number }) => {
  return (
    <div className="relative flex overflow-hidden w-full select-none">
        
        {/* Masking Gradient (Fade Left & Right) */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-blue/15 to-transparent blur-[150px] z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-purple/15 to-transparent blur-[150px] z-10" />

        <motion.div 
            className="flex gap-4 py-4"
            initial={{ x: direction === "left" ? 0 : "-50%" }}
            animate={{ x: direction === "left" ? "-50%" : 0 }}
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: speed 
            }}
        >
            {/* Render item 2x (Duplikasi) untuk efek infinite loop seamless */}
            {[...items, ...items, ...items, ...items].map((tech, i) => (
                <TechCard key={i} name={tech.name} Icon={tech.icon} />
            ))}
        </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function SectionFour() {
  const containerRef = useRef(null);
  
  // Parallax Effect untuk Background Elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative w-full bg-black py-24 md:py-32 overflow-hidden flex flex-col items-center">
      
      {/* Grid Pattern Halus */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Ambient Glow Biru & Ungu */}
      <motion.div style={{ y: yBg }} className="absolute top-1/4 -left-[200px] w-[800px] h-[800px] bg-blue/15 blur-[150px] rounded-full pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute bottom-0 -right-[200px] w-[800px] h-[800px] bg-purple/15 blur-[150px] rounded-full pointer-events-none" />


      <div className="relative z-10 w-full max-w-7xl px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
            >
                <span className="text-md font-medium text-zinc-400">
                    [ our tech stack ]
                </span>
            </motion.div>

            {/* Title */}
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-5xl font-display font-bold text-white leading-tight mb-6"
            >
                The tools, frameworks, and <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">
                    technologies powering our solutions.
                </span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-md md:text-lg"
            >
                We carefully select the best modern technologies to ensure performance, scalability, and security for every project we build.
            </motion.p>
        </div>

        {/* MARQUEE SECTION */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col mb-16 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        >
            {/* Row 1: Gerak ke Kiri */}
            <MarqueeRow items={stackRow1} direction="left" speed={30} />
            
            {/* Row 2: Gerak ke Kanan */}
            <MarqueeRow items={stackRow2} direction="right" speed={35} />

            {/* Row 3: Gerak ke Kiri */}
            <MarqueeRow items={stackRow1} direction="left" speed={30} />
        </motion.div>


        {/* BUTTON CTA */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
        >
             <Button variant="primary">
                see all technologies
             </Button>
        </motion.div>

      </div>
    </section>
  );
}