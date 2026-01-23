"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

interface CarouselProps {
  items: Project[];
}

export default function InfiniteCarousel({ items }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Ref Accumulator: Menyimpan posisi scroll desimal yang presisi agar tidak dibulatkan browser mobile
  const scrollPosRef = useRef<number>(0); 

  // Duplikasi minimal (3 set) untuk logic teleport seamless loop
  const infiniteItems = [...items, ...items, ...items];

  // Logic Scroll Otomatis & Teleport (Seamless Loop)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;
    const speed = 0.5; // Kecepatan scroll

    // Fungsi inisialisasi posisi awal (tengah)
    const initScroll = () => {
        // Kita hitung lebar satu set
        const oneSetWidth = scroller.scrollWidth / 3;
        
        // Jika scroll masih di 0 (awal load), kita lempar ke tengah
        if (scroller.scrollLeft < 50) { // Threshold kecil untuk safety
            scroller.scrollLeft = oneSetWidth;
            scrollPosRef.current = oneSetWidth; // Sinkronkan Ref dengan posisi tengah
        } else {
            // Jika re-render tapi posisi sudah ada, ambil posisi terakhir
            scrollPosRef.current = scroller.scrollLeft;
        }
    };

    // Jalankan init
    initScroll();

    const scrollStep = () => {
      // UPDATE VARIABLE (Bukan DOM langsung)
      // Ini mencegah pembulatan angka oleh browser mobile
      scrollPosRef.current += speed;

      const oneSetWidth = scroller.scrollWidth / 3;
      
      // LOGIC TELEPORTASI (Berdasarkan variable Ref)
      // Batas kanan: Jika sudah lewat 2/3
      if (scrollPosRef.current >= oneSetWidth * 2) {
          scrollPosRef.current -= oneSetWidth;
      } 
      // Batas kiri: Jika entah kenapa mundur ke < 0
      else if (scrollPosRef.current <= 0) {
          scrollPosRef.current += oneSetWidth;
      }

      // APPLY KE DOM
      scroller.scrollLeft = scrollPosRef.current;

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [items.length]); 

  return (
    <div className="relative w-full py-2 md:py-10">
      {/* Track */}
      <div
        ref={scrollerRef}
        className="flex w-full overflow-x-hidden md:overflow-x-hidden no-scrollbar gap-6 px-4 md:px-10 py-8 pointer-events-none select-none"
      >
        {infiniteItems.map((project, index) => (
          <ProjectCard 
            key={`${project.id}-${index}`} 
            project={project} 
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div 
        className={cn(
            // Penyesuaian lebar mobile agar proporsional
            "relative shrink-0 w-[260px] xs:w-[330px] md:w-[550px] h-[230px] md:h-[400px] bg-black flex flex-col transition-all duration-500",
            "opacity-100" 
        )}
    >
      
      {/* FRAME */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-blue" />
        <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-blue" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-blue" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-blue" />
      </div>

      <div className="p-4 flex flex-col h-full">
        {/* IMAGE */}
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-4 bg-zinc-900">
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 300px, 550px"
            />
        </div>

        {/* TEXT MINI */}
        <div className="mt-auto">
            <h3 className="text-md font-bold text-white truncate">
                {project.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1 truncate">{project.category}</p>
        </div>
      </div>
    </div>
  );
}