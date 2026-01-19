"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { projectsData } from "@/config/projects-data";
import { Project } from "@/components/ui/carousel";

export default function SectionProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mengambil data scroll dari container referensi
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tinggi total container = 100vh per project
  const heightMultiplier = projectsData.length * 100;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-zinc-950" 
      style={{ height: `${heightMultiplier + 50}vh` }} 
    >
      
      {/* STICKY CAMERA: Viewport yang diam di layar */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Intro Text */}
        <IntroSign scrollProgress={scrollYProgress} />

        {/* Stack of Project Pages */}
        <div className="relative w-full h-full">
          {projectsData.map((project, index) => {
             // Logic Range Scroll
             const step = 1 / projectsData.length;
             const start = step * index;
             const end = start + step;

             return (
               <ProjectSlide
                 key={project.id}
                 project={project}
                 index={index}
                 progress={scrollYProgress}
                 range={[start, end]}
               />
             );
          })}
        </div>

      </div>
    </section>
  );
}

// --- SUB COMPONENTS ---

function IntroSign({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // Fade out lebih cepat (0 - 5% scroll sudah hilang)
  const opacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.05], [0, -100]);

  return (
    <motion.div 
      style={{ opacity, y, zIndex: 5 }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 text-center px-4 pb-6">
        Selected Works
      </h2>
      <div className="flex flex-col items-center gap-2 animate-bounce">
        <span className="text-zinc-400 text-xs font-mono uppercase tracking-[0.2em]">Scroll Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </motion.div>
  );
}

function ProjectSlide({ 
  project, 
  index, 
  progress, 
  range 
}: { 
  project: Project; 
  index: number; 
  progress: MotionValue<number>; 
  range: [number, number]; 
}) {
  const patterns = ['center', 'bottom', 'top', 'left', 'right'];
  const pattern = patterns[index % patterns.length];

  // Timing Logic
  const entryStart = range[0] - 0.05 < 0 ? 0 : range[0] - 0.05; 
  const entryEnd = range[0] + 0.1; 

  // --- ANIMATION HOOKS (Top Level) ---
  const opacity = useTransform(progress, [entryStart, entryEnd], [0, 1]);
  const scale = useTransform(progress, [entryStart, entryEnd], [0.8, 1]); 
  
  // Transformasi Posisi (Slide In)
  const yBottom = useTransform(progress, [entryStart, entryEnd], ["100%", "0%"]);
  const yTop = useTransform(progress, [entryStart, entryEnd], ["-100%", "0%"]);
  const xLeft = useTransform(progress, [entryStart, entryEnd], ["-100%", "0%"]);
  const xRight = useTransform(progress, [entryStart, entryEnd], ["100%", "0%"]);

  // 1. LOGIC MENENTUKAN WARNA BACKGROUND BERDASARKAN PATTERN
  const getBgClass = () => {
      switch (pattern) {
        case 'center': return 'bg-white';
        case 'bottom': return 'bg-zinc-300';
        case 'top':    return 'bg-zinc-500';
        case 'left':   return 'bg-zinc-700';
        case 'right':  return 'bg-black';
        default:       return 'bg-black';
      }
  };

  // 2. LOGIC ANIMASI STYLE
  const getMotionStyle = () => {
      const baseStyle = { zIndex: index + 10 };

      switch (pattern) {
        case 'center':
          return { ...baseStyle, opacity, scale };
        case 'bottom':
          return { ...baseStyle, y: yBottom };
        case 'top':
          return { ...baseStyle, y: yTop };
        case 'left':
          return { ...baseStyle, x: xLeft };
        case 'right':
          return { ...baseStyle, x: xRight };
        default:
          return baseStyle;
      }
  };

  return (
    // DIV HITAM (DYNAMIC COLOR) FULL SCREEN
    <motion.div
      style={getMotionStyle()}
      // getBgClass() agar bg dynamic
      className={`absolute inset-0 h-full w-full ${getBgClass()} flex items-end justify-center p-4 md:p-6`}
    >
        
        {/* DIV KARTU */}
        <div className="relative w-full max-w-[1400px] h-[85vh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col xl:flex-row group">

            {/* BAGIAN KIRI: GAMBAR */}
            <div className="relative w-full xl:w-2/3 h-[60vh] xl:h-full overflow-hidden">
                <div className="absolute inset-0 z-10 pointer-events-none" />
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    priority
                />
            </div>

            {/* BAGIAN KANAN: DETAIL & STATS */}
            <div className="w-full xl:w-1/3 h-[40vh] xl:h-full bg-zinc-950 p-6 md:p-10 lg:p-12 flex flex-col justify-center border-l border-white/5 z-10">
                <div className="relative space-y-6">
                    <div>
                        <span className="text-blue-400 text-xs uppercase tracking-widest mb-2 block">
                            [ {project.category} ]
                        </span>
                        <h3 className="text-3xl md:text-5xl font-display font-semibold text-white leading-tight mb-4">
                            {project.title}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* STATS GRID */}
                    <div className="pt-4 xl:pt-8 mt-auto border-t border-white/10">
                        <div className="grid grid-cols-3 gap-y-6 gap-x-4 text-center justify-items-center">
                            {project.stats && project.stats.length > 0 ? (
                                project.stats.map((stat, i) => (
                                    <div key={i}>
                                        <h4 className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest mb-1 font-mono">
                                            {stat.label}
                                        </h4>
                                        <p className="text-white text-sm md:text-base font-medium">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <h4 className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Year</h4>
                                        <p className="text-white">2024</p>
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Status</h4>
                                        <p className="text-white">Completed</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </motion.div>
  );
}