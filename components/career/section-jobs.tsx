"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { jobsData } from "@/config/jobs-data";
import JobCard from "@/components/ui/job-card";
import Pagination from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/ui/filter-select";

const ITEMS_PER_PAGE = 9;

// Options for Filters
const typeOptions = [
  { value: "All", label: "All Types" },
  { value: "Fulltime", label: "Fulltime" },
  { value: "Freelance", label: "Freelance" },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" },
];

const locationOptions = [
  { value: "All", label: "All Locations" },
  { value: "Remote", label: "Remote" },
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
];

const SectionJobs = () => {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Logic Filtering ---
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      // Filter by Search Query (Title or Division)
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.stack.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by Type
      const matchType = filterType === "All" || job.type === filterType;

      // Filter by Location
      const matchLocation = filterLocation === "All" || job.location === filterLocation;

      return matchSearch && matchType && matchLocation;
    });
  }, [searchQuery, filterType, filterLocation]);

  // --- Logic Pagination ---
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when filter changes
  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/banner.png" 
              alt="Career at Singabyte"
              fill
              priority
              className="object-cover opacity-90"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black via-transparent to-black/40" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-tight">
                build what's next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  with singabyte
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-zinc-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light"
            >
              Join Singabyte, where we turn complex problems into elegant software solutions. 
              We are looking for builders, thinkers, and innovators.
            </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-2 lg:py-20 container mx-auto px-6" id="open-positions">
        
        {/* Header & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Open Positions
          </h2>

          {/* Filter Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            
            {/* Type Filter */}
            <FilterSelect 
                value={filterType}
                onChange={(val) => handleFilterChange(setFilterType, val)}
                options={typeOptions}
                className="w-full md:w-40"
            />

            <FilterSelect 
                value={filterLocation}
                onChange={(val) => handleFilterChange(setFilterLocation, val)}
                options={locationOptions}
                className="w-full md:w-40"
            />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
                <Input 
                    placeholder="Type job title..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-600 hover:text-white transition-colors">
                    <Search className="w-4 h-4" />
                </button>
            </form>

          </div>
        </motion.div>

        {/* JOBS GRID */}
        {currentJobs.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {currentJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center border border-zinc-800 border-dashed rounded-lg bg-zinc-900/30"
          >
            <h3 className="text-xl font-bold text-zinc-400 mb-2">No positions found</h3>
            <p className="text-zinc-600">Try adjusting your search or filters.</p>
            <button 
                onClick={() => {setSearchQuery(""); setFilterType("All"); setFilterLocation("All")}}
                className="mt-4 text-blue-500 hover:underline text-sm"
            >
                Clear all filters
            </button>
          </motion.div>
        )}

        {/* PAGINATION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
          />
        </motion.div>

      </section>
    </div>
  );
};

export default SectionJobs;