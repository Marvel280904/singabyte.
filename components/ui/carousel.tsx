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

  // Duplikasi minimal (3 set) untuk logic teleport seamless loop
  const infiniteItems = [...items, ...items, ...items];

  // Logic Scroll Otomatis & Teleport (Seamless Loop)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;
    const speed = 0.5; // Kecepatan scroll konstan

    const scrollStep = () => {
      // Logic: Selalu scroll, tidak peduli hover atau click
      scroller.scrollLeft += speed;

      // LOGIC TELEPORTASI (True Loop Illusion)
      const oneSetWidth = scroller.scrollWidth / 3;
      
      // Batas kanan: Jika sudah lewat 2/3 (masuk set 3), mundur ke set 2
      if (scroller.scrollLeft >= oneSetWidth * 2) {
          scroller.scrollLeft -= oneSetWidth;
      } 
      // Batas kiri: Jika user scroll manual ke kiri sampai < set 2, maju ke set 2
      else if (scroller.scrollLeft <= 0) {
          scroller.scrollLeft += oneSetWidth;
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    // Set posisi awal di tengah (Set ke-2)
    if (scroller.scrollLeft === 0) {
        scroller.scrollLeft = scroller.scrollWidth / 3; 
    }

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [items.length]); 

  return (
    <div className="relative w-full py-2 md:py-10">
      {/* Track */}
      <div
        ref={scrollerRef}
        // Hapus cursor-grab, event listener mouse/touch, dan logic hover
        className="flex w-full overflow-x-hidden no-scrollbar gap-6 px-10 py-8 pointer-events-none select-none"
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
    // Hapus onClick, cursor-pointer, dan hover effects yang interaktif
    <div 
        className={cn(
            "relative shrink-0 w-[330px] md:w-[550px] h-[230px] md:h-[400px] bg-black flex flex-col transition-all duration-500",
            // Tetap berikan sedikit shadow statis agar terlihat bagus, tapi tanpa hover interaction
            "opacity-100" 
        )}
    >
      
      {/* FRAME VISUAL - Tetap ada untuk estetika */}
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
                className="object-cover"
            />
        </div>

        {/* TEXT MINI */}
        <div className="mt-auto">
            <h3 className="text-md font-bold text-white">
                {project.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">{project.category}</p>
        </div>
      </div>
    </div>
  );
}