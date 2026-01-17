"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Layout, Smartphone, Code2, Brain, Wallpaper, Globe } from "lucide-react";

// --- Data 7 Poin Tech Stack ---
const techStackData = [
  {
    title: "Frontend Development",
    description: "We build interfaces that are not just visually stunning but also lightning-fast. In a market where user attention span is short, we ensure your users stay engaged with responsive and intuitive interactions.",
    icon: <Layout className="w-6 h-6" />,
    techs: ["Vue.js", "React.js", "Next.js"],
    techIcons: ["/icons/vue.png", "/icons/react.png", "/icons/next.png"], 
  },
  {
    title: "Backend Systems",
    description: "Scalability is the key to growth. We engineer secure and high-performance server-side architectures that can handle high traffic and complex data processing, ensuring your business runs without interruption.",
    icon: <Database className="w-6 h-6" />,
    techs: ["Node.js", "MySQL"],
    techIcons: ["/icons/node.png", "/icons/sql.png"],
  },
  {
    title: "Mobile Apps",
    description: "Capture the mobile-first market with apps that feel natural on both iOS and Android. We use cross-platform technologies to reduce development time without sacrificing performance or user experience.",
    icon: <Smartphone className="w-6 h-6" />,
    techs: ["React Native", "Swift", "Kotlin"],
    techIcons: ["/icons/react.png", "/icons/swift.png", "/icons/kotlin.png"],
  },
  {
    title: "AI & Machine Learning",
    description: "Stay ahead of the curve by integrating intelligence into your product. Whether it's automation, predictive analytics, or natural language processing, we help you leverage data to solve complex problems efficiently.",
    icon: <Brain className="w-6 h-6" />,
    techs: ["OpenAI API", "Google Gemini API", "Anthropic Claude", "TensorFlow"],
    techIcons: ["/icons/openai.png", "/icons/gemini.png", "/icons/claude.png", "/icons/tensorflow.png"],
  },
  {
    title: "Cloud & DevOps",
    description: "Reliability is non-negotiable. We set up automated pipelines and secure cloud environments that allow for rapid deployment and cost-effective scaling, so you can focus on business logic while we handle the uptime.",
    icon: <Code2 className="w-6 h-6" />,
    techs: ["AWS", "GCP", "Azure", "Docker"],
    techIcons: ["/icons/aws.png", "/icons/gcp.png", "/icons/azure.png", "/icons/docker.png"],
  },
  {
    title: "UI/UX Design",
    description: "In a crowded digital landscape, user experience is your biggest differentiator. We blend aesthetics with functionality to create products that are easy to use and hard to forget, directly impacting your customer retention and conversion rates.",
    icon: <Wallpaper className="w-6 h-6" />,
    techs: ["Figma", "Adobe"],
    techIcons: ["/icons/figma.png", "/icons/adobe.png"],
  },
  {
    title: "Digital Marketing",
    description: "Building a great product is only half the battle; getting it seen is the other. We use analytical tools and strategic frameworks to increase your visibility, drive traffic, and convert visitors into loyal customers.",
    icon: <Globe className="w-6 h-6" />,
    techs: [],
    techIcons: [],
  },
];

// Component Child untuk setiap item timeline
const TimelineItem = ({ data, index }: { data: any; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }} 
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center w-full relative ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Spacer untuk Desktop */}
      <div className="hidden md:block flex-1" />

      {/* Titik Tengah (Dot Connector) */}
      <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <div className="w-4 h-4 bg-black border-2 border-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 w-full pl-12 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className={`p-6 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-600/50 hover:shadow-blue-neon transition-colors duration-300 backdrop-blur-sm group ${isEven ? 'text-left' : 'md:text-left'}`}>
            
            {/* Header: Icon & Title */}
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600/10 rounded-lg text-blue-500 group-hover:text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                    {data.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-blue-500 transition-colors">
                    {data.title}
                </h3>
            </div>

            {/* Description */}
            <p className="text-zinc-400 group-hover:text-white mb-6 leading-relaxed">
                {data.description}
            </p>

            {/* Tech Tags / Badges */}
            <div className="flex flex-wrap gap-3">
                {data.techs.map((tech: string, i: number) => (
                    <div 
                        key={i} 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black border border-zinc-800 text-sm text-zinc-300 font-medium font-mono hover:border-blue hover:text-white transition-colors"
                    >
                        {data.techIcons && data.techIcons[i] && (
                          <img 
                            src={data.techIcons[i]} 
                            alt={`${tech} icon`}
                            className="w-5 h-5 object-contain" 
                          />
                        )}
                        
                        {/* Fallback jika tidak ada icon, tampilkan dot biru (opsional) */}
                        {(!data.techIcons || !data.techIcons[i]) && (
                           <span className="font-display w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        )}

                        {tech}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const SectionTech = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animasi garis biru memanjang ke bawah sesuai scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);

  return (
    <section className="bg-black text-white py-20 mt-16 overflow-hidden" ref={containerRef}>
      
      {/* --- Top Hero Banner --- */}
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Our Tech Stack
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We leverage modern frameworks and battle-tested tools to build fast,
            scalable, and secure applications for your business growth.
            </p>
        </motion.div>
      </div>

      {/* --- Main Content (Timeline Style) --- */}
      <div className="container mx-auto px-4 md:px-0 relative">
        
        {/* Garis Vertikal */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2" />
        
        {/* Garis Vertikal Biru */}
        <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-blue-600 -translate-x-1/2 origin-top z-0"
        />

        <div className="space-y-12 md:space-y-24">
          {techStackData.map((item, index) => (
            <TimelineItem key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTech;