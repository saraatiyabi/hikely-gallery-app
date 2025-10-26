// src/components/gallery/SearchBar.tsx
"use client";

import { useState, FormEvent } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/className";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  popularTags?: string[];
  onTagClick?: (tag: string) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  popularTags = [],
  onTagClick,
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsExpanded(false);
    // Search is already happening in real-time via onSearchChange
  };

  const handleClear = () => {
    onClearSearch();
  };

  const handleTagClick = (tag: string) => {
    onSearchChange(tag);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Desktop Search Bar */}
      <form onSubmit={handleSubmit} className="block">
        <div className="relative group">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-slate-400 z-10" />
            <input
              type="text"
              placeholder="Search for hiking trails, mountains, nature..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-32 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm"
            />
            <div className="absolute right-2 flex items-center space-x-2">
              {/* Clear Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Search Button */}
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 shadow-md hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
