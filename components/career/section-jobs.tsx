"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
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

  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* 1. HERO SECTION (Video Background) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Image  Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tes.jpeg" 
            alt="Career at Singabyte"
            fill
            priority
            className="object-cover opacity-100"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-tight">
              build what's next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                with singabyte
              </span>
            </h1>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              Join Singabyte, where we turn complex problems into elegant software solutions. 
              We are looking for builders, thinkers, and innovators.
            </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT (Filters & List) */}
      <section className="py-20 container mx-auto px-6" id="open-positions">
        
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-center mb-12 gap-6">
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
        </div>

        {/* 3. JOBS GRID */}
        {currentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center border border-zinc-800 border-dashed rounded-lg bg-zinc-900/30">
            <h3 className="text-xl font-bold text-zinc-400 mb-2">No positions found</h3>
            <p className="text-zinc-600">Try adjusting your search or filters.</p>
            <button 
                onClick={() => {setSearchQuery(""); setFilterType("All"); setFilterLocation("All")}}
                className="mt-4 text-blue-500 hover:underline text-sm"
            >
                Clear all filters
            </button>
          </div>
        )}

        {/* 4. PAGINATION */}
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />

      </section>
    </div>
  );
};

export default SectionJobs;