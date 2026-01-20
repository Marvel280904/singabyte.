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
        case 'bottom': return 'bg-zinc-500';
        case 'top':    return 'bg-blue-800';
        case 'left':   return 'bg-zinc-700';
        case 'right':  return 'bg-black';
        default:       return 'bg-black';
      }
  };

  const isLightBg = pattern === 'center';
  const isGreyBg = pattern === 'bottom';

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
    <motion.div
      style={getMotionStyle()}
      className={`absolute inset-0 h-full w-full ${getBgClass()} flex items-center justify-center overflow-hidden`}
    >
        {/* CONTAINER UTAMA: GRID LAYOUT 
            - Max-width dibatasi agar rapi
            - Padding responsif
            - Di Mobile: Flex Column (atas bawah)
            - Di Desktop: Grid 2 Kolom (kiri kanan)
        */}
        <div className="w-full h-full max-w-[1400px] px-6 pt-16 md:pt-12 xl:p-20 mx-auto flex flex-col xl:grid xl:grid-cols-12 gap-8 lg:gap-12 items-center justify-center">

            {/* --- AREA GAMBAR (Showcase) --- 
                Di Desktop ambil 7 kolom (lebih lebar).
                Order-1 di mobile (gambar duluan), Order-2 di desktop (opsional, disini default).
            */}
            <div className="w-full xl:col-span-7 h-[40vh] md:h-[50vh] xl:h-[70vh] relative flex items-center justify-center">
                
                {/* Frame/Background Image: Memberikan kesan "Window" atau "Canvas" */}
                <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 flex items-center justify-center group">
                    
                    {/* Efek Glow di belakang gambar (Opsional) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1400}
                        height={900}
                        // Object Contain: Gambar utuh 100%
                        // Max-h/w: Membatasi agar tidak keluar frame
                        className="object-contain w-full h-full max-h-full max-w-full drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                    />
                </div>
            </div>

            {/* --- AREA DETAIL & STATS --- 
                Di Desktop ambil 5 kolom.
            */}
            <div className={`w-full xl:col-span-5 flex flex-col justify-center space-y-6 md:space-y-8 ${isLightBg ? 'text-zinc-900' : 'text-white'}`}>
                
                {/* Header Text */}
                <div className="space-y-4 text-center xl:text-left">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                      [ {project.category} ]
                    </span>
                    
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                        {project.title}
                    </h3>
                    
                    <p className={`text-sm md:text-base leading-relaxed ${
                      isLightBg 
                        ? 'text-zinc-600'        
                        : isGreyBg 
                        ? 'text-zinc-300'        
                        : 'text-zinc-400'        
                      } max-w-xl mx-auto xl:mx-0`}>
                        {project.description}
                    </p>
                </div>

                {/* Stats / Info Grid */}
                <div className={`grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t ${isLightBg ? 'border-zinc-400' : 'border-white/30'}`}>
                    {project.stats && project.stats.length > 0 ? (
                        project.stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <h4 className={`text-[10px] md:text-xs uppercase tracking-widest mb-1 font-mono ${isGreyBg ? 'text-zinc-300' : 'text-zinc-400'}`}>
                                    {stat.label}
                                </h4>
                                <p className="text-sm md:text-lg font-medium">
                                    {stat.value}
                                </p>
                            </div>
                        ))
                    ) : (
                        // Default stats jika tidak ada data
                        <>
                            <div className="text-center lg:text-left">
                                <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Year</h4>
                                <p className="font-medium">2024</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Role</h4>
                                <p className="font-medium">Full Stack</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    </motion.div>
  );
}