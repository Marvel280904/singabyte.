"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { motion, Variants } from "framer-motion";

// Animation Variants
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

const subjectOptions = [
    { value: "website", label: "Website Development" },
    { value: "webapp", label: "Web Application (SaaS/Dashboard)" },
    { value: "mobile", label: "Mobile Application (iOS/Android)" },
    { value: "blockchain", label: "Blockchain & Web3 Solutions" },
    { value: "other", label: "Other / General Inquiry" },
];

export default function SectionForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Tambahkan logic API submit di sini
  };

  // Logic Generate Random Stars
  const [stars, setStars] = useState<{ top: string; left: string; delay: string; size: string; opacity: number; color: string }[]>([]);

  useEffect(() => {
    // Color: White, Blue, Purple
    const colors = ["bg-white", "bg-blue", "bg-purple"];

    // Total Star/Dot
    const starCount = 150; 

    // Randomizer
    const newStars = Array.from({ length: starCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `delay-${[75, 100, 150, 200, 300, 500, 700, 1000][Math.floor(Math.random() * 8)]}`,
      size: Math.random() > 0.5 ? 'h-1 w-1' : 'h-0.5 w-0.5',
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="w-full bg-black min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60"
          >
            <source src="/videos/hero-contact.mp4" type="video/mp4" />
          </video>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter drop-shadow-2xl">
                    Let's Build the Future<span className="text-blue">.</span>
                 </h1>
            </motion.div>
        </div>
      </section>


      {/* FORM SECTION */}
      <section className="relative z-10 px-6 lg:px-8 pb-24 -mt-10">
        {/* Shining Stars / Dots (Generated Randomly) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full animate-twinkle ${star.color} ${star.delay} ${star.size}`}
                    style={{ 
                        top: star.top, 
                        left: star.left,
                        opacity: star.opacity
                    }}
                />
            ))}
        </div>

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative z-10 max-w-4xl mx-auto bg-black border border-white/10 rounded-3xl p-4 md:p-12 lg:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
            
            {/* Header Text */}
            <div className="mb-12">
                <div className="mb-6">
                    <span className="text-md font-bold text-blue tracking-widest">
                        [ inquiry ]
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Let's build together
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                    Ready to transform your vision into reality? Tell us about your project and we’ll help you navigate the next steps.
                </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Row 1: Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white ml-1">[ First Name ]</label>
                        <Input 
                            required
                            placeholder="ex. John"
                            className="h-12 mt-1 border-blue/30 focus-visible:border-blue bg-zinc-950/50"
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white ml-1">[ Last Name ]</label>
                        <Input 
                            required
                            placeholder="ex. Doe"
                            className="h-12 mt-1 border-blue/30 focus-visible:border-blue bg-zinc-950/50"
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>
                </div>

                {/* Row 2: Email & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white ml-1">[ Email Address ]</label>
                        <Input 
                            required
                            type="email"
                            placeholder="john@company.com"
                            className="h-12 mt-1 border-blue/30 focus-visible:border-blue bg-zinc-950/50"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white ml-1">[ Company Name ]</label>
                        <Input 
                            placeholder="Your Company Ltd."
                            className="h-12 mt-1 border-blue/30 focus-visible:border-blue bg-zinc-950/50"
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                    </div>
                </div>

                {/* Row 3: Subject */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white ml-1">[ Subject ]</label>
                    <Select 
                        placeholder="What are you looking to build?"
                        options={subjectOptions}
                        onChange={(val) => setFormData({...formData, subject: val})}
                        className="w-full mt-1"
                    />
                </div>

                {/* Row 4: Message */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white ml-1">[ Message ]</label>
                    <textarea 
                        required
                        rows={6}
                        placeholder="Tell us a bit more about your project goals, timeline, and budget..."
                        className="w-full mt-1 border border-blue/30 bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue transition-all resize-none"
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <Button variant="primary" className="w-full text-base font-semibold group">
                        submit message
                    </Button>
                </div>

            </form>

        </motion.div>
      </section>

    </div>
  );
}