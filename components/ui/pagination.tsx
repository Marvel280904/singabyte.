import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded bg-blue border border-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-zinc-500 font-mono text-sm">
        Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded bg-blue border border-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;