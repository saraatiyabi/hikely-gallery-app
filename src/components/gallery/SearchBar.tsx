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
      <form onSubmit={handleSubmit} className="hidden md:block">
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

      {/* Mobile Search Bar */}
      <div className="md:hidden">
        {/* Collapsed Search Icon */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 shadow-sm"
          >
            <Search className="h-5 w-5" />
          </button>
        )}

        {/* Expanded Mobile Search */}
        {isExpanded && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Search
              </h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hiking trails, mountains..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400 text-base"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className="px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-200 border border-green-200 dark:border-green-800"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleClear();
                    setIsExpanded(false);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 shadow-md"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
