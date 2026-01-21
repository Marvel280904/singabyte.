import { Project } from "@/components/ui/carousel";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Renotake Web App",
    category: "Website Application",
    description: "An AI-powered platform designed to empower homeowners with accurate renovation cost estimates and intelligent budget planning. It streamlines the home improvement journey by analyzing project requirements to provide transparent financial projections.",
    image: "/images/projects-1.png", 
    stats: [
        { label: "Timeline", value: "Ongoing" },
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" },
    ]
  },
  {
    id: 2,
    title: "Essen Web App",
    category: "E-Commerce Website",
    description: "A comprehensive e-commerce platform offering a curated collection of premium home furnishings, including beds, lighting, and seating. The site delivers a seamless shopping experience with intuitive navigation designed to elevate modern living spaces.",
    image: "/images/projects-2.png",
    stats: [
        { label: "Timeline", value: "1 Months" },
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" },
    ]
  },
  {
    id: 3,
    title: "Chain of Advice",
    category: "FinTech Education",
    description: "An educational platform providing transparent insights into digital assets while clearly distinguishing informative content from financial advice. It serves as a compliance-focused resource for users to explore market trends without making specific investment recommendations.",
    image: "/images/projects-3.png",
    stats: [
        { label: "Timeline", value: "3 Months" },
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" },
    ]
  },
  {
    id: 4,
    title: "AE Marine Web",
    category: "Corporate Website",
    description: "A professional corporate profile designed for a Singapore-based shipbroker to elevate their digital presence in the energy transportation market. The site features a streamlined layout that effectively showcases their tanker chartering expertise and consultancy services.",
    image: "/images/projects-4.png",
    stats: [
        { label: "Timeline", value: "Ongoing" }, 
        { label: "Role", value: "Full Stack" },
        { label: "Tech", value: "Next.js" }, 
    ]
  },
  {
    id: 5,
    title: "Renotake Mobile App",
    category: "Mobile Application",
    description: "The mobile extension of the Renotake ecosystem, bringing AI-powered renovation cost estimation directly to users' fingertips. It offers homeowners instant, on-the-go access to intelligent budget planning and project assessment tools.",
    image: "/images/projects-5.png", 
    stats: [
        { label: "Timeline", value: "Ongoing" },
        { label: "Role", value: "Mobile Dev" },
        { label: "Tech", value: "React Native" }, 
    ]
  },
];