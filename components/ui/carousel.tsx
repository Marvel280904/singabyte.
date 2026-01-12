"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  onSelect: (project: Project | null) => void; // Update tipe onSelect agar bisa null
  selectedId: number | null;
}

export default function InfiniteCarousel({ items, onSelect, selectedId }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref baru untuk container utama
  const [isHovered, setIsHovered] = useState(false);

  // Duplikasi minimal (3 set) cukup untuk logic teleport
  // Set 1: Buat buffer scroll kiri
  // Set 2: Main content
  // Set 3: Buat buffer scroll kanan
  const infiniteItems = [...items, ...items, ...items];

  // Logic Scroll Otomatis & Teleport (Seamless Loop)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;
    const speed = 0.5;

    const scrollStep = () => {
      // Stop scroll jika user hover ATAU jika ada item yang sedang dipilih
      const shouldStop = isHovered || selectedId !== null;

      if (!shouldStop) {
        scroller.scrollLeft += speed;

        // LOGIC TELEPORTASI (True Loop Illusion)
        // Jika scroll sudah mencapai akhir dari set ke-2, kembalikan ke awal set ke-2 secara instan.
        // Asumsi: panjang 1 set adalah 1/3 total scrollWidth.
        const oneSetWidth = scroller.scrollWidth / 3;
        
        // Batas kanan: Jika sudah lewat 2/3 (masuk set 3), mundur ke set 2
        if (scroller.scrollLeft >= oneSetWidth * 2) {
            scroller.scrollLeft -= oneSetWidth;
        } 
        // Batas kiri: Jika user scroll manual ke kiri sampai < set 2, maju ke set 2
        else if (scroller.scrollLeft <= 0) {
            scroller.scrollLeft += oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    // Set posisi awal di tengah (Set ke-2) agar bisa scroll ke kiri/kanan
    // Hanya jalankan sekali saat mount jika belum di-set
    if (scroller.scrollLeft === 0) {
        scroller.scrollLeft = scroller.scrollWidth / 3; 
    }

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedId, items.length]); 


  // --- FITUR BARU: Deselect on Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        // Jika ada yang selected DAN klik terjadi di luar container carousel
        if (selectedId !== null && containerRef.current && !containerRef.current.contains(event.target as Node)) {
            onSelect(null); // Deselect (kirim null)
        }
    };

    // Tambahkan event listener ke document
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId, onSelect]);


  const animateScroll = (element: HTMLElement, target: number, duration: number) => {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        
        // Easing Function: Ease Out Quart (Sangat halus, melambat di akhir)
        // t adalah progress (0 sampai 1)
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
        
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutQuart(progress);

        element.scrollLeft = start + (change * ease);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
  };


  // --- 4. HANDLE CLICK (UPDATED) ---
  const handleCardClick = (project: Project, index: number) => {
    if (selectedId === project.id) {
        onSelect(null);
        return;
    }

    onSelect(project);
    
    const scroller = scrollerRef.current;
    if (scroller) {
        const selectedElement = scroller.children[index] as HTMLElement;
        if (selectedElement) {
            // Hitung target posisi tengah
            const targetPosition = 
                selectedElement.offsetLeft + 
                (selectedElement.offsetWidth / 2) - 
                (scroller.clientWidth / 2);

            // GANTI 'scroller.scrollTo' DENGAN CUSTOM ANIMATION
            // Durasi 800ms (0.8 detik) agar terasa smooth dan tidak kaget
            animateScroll(scroller, targetPosition, 800);
        }
    }
  };

  return (
    // Tambahkan ref ke container utama untuk deteksi Click Outside
    <div ref={containerRef} className="relative w-full py-2 md:py-10 group">
      
      {/* Gradient Fade - Desktop Only */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-black to-transparent hidden md:block" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-black to-transparent hidden md:block" />

      {/* Track */}
      <div
        ref={scrollerRef}
        className="flex w-full overflow-x-scroll no-scrollbar gap-6 px-10 py-8 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {infiniteItems.map((project, index) => (
          <ProjectCard 
            key={`${project.id}-${index}`} 
            project={project} 
            isSelected={project.id === selectedId}
            onClick={() => handleCardClick(project, index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ 
    project, 
    isSelected, 
    onClick 
}: { 
    project: Project; 
    isSelected: boolean; 
    onClick: () => void;
}) {
  return (
    <div 
        onClick={(e) => {
            e.stopPropagation(); // Mencegah event bubbling ke document (agar tidak dianggap click outside)
            onClick();
        }}
        className={cn(
            "relative shrink-0 w-[330px] md:w-[550px] h-[230px] md:h-[400px] bg-black border transition-all duration-500 group/card cursor-pointer flex flex-col",
            isSelected 
                ? "border-blue z-20 shadow-blue-neon scale-100" 
                : "border-zinc-800 opacity-70 hover:opacity-100 hover:border-zinc-600 hover:shadow-[0_0_40px_-10px_rgba(0,64,255,0.4)]"
        )}
    >
      
      {/* FRAME VISUAL */}
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 opacity-100 group-hover/card:opacity-50">
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
                className={cn(
                    "object-cover transition-transform duration-700",
                    isSelected ? "scale-110" : "group-hover/card:scale-105"
                )}
            />
        </div>

        {/* TEXT MINI */}
        <div className="mt-auto">
            <h3 className={cn("text-md font-semibold transition-colors", isSelected ? "text-blue" : "text-white")}>
                {project.title}
            </h3>
        </div>
      </div>
    </div>
  );
}