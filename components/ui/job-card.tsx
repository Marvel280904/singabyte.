import React from "react";
import Link from "next/link";
import { Job } from "@/config/jobs-data";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div className="group flex flex-col p-6 bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/50 hover:shadow-blue-neon/20 transition-all duration-300 rounded-lg h-full">
      {/* Header */}
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
        {job.title}
      </h3>
      
      {/* Division / Stack Tag */}
      <p className="text-sm text-zinc-500 font-mono mb-4">
        [{job.stack}]
      </p>

      {/* Description */}
      <p className="text-zinc-300 text-md mb-6 flex-grow leading-relaxed">
        {job.description}
      </p>

      {/* Footer Info */}
      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-300 mb-6 uppercase tracking-wider">
        <div>
            <span className="block text-zinc-500 mb-1">[type]</span>
            {job.type}
        </div>
        <div className="text-right">
            <span className="block text-zinc-500 mb-1">[location]</span>
            {job.location}
        </div>
      </div>

      {/* Button */}
      <div className="mt-auto">
          <Button  
            variant="primary" 
            className="w-full font-bold"
            onClick={onClick}
          >
            view details
          </Button>
      </div>
    </div>
  );
};

export default JobCard;