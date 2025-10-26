// src/components/gallery/FilterBar.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const filters = [
  "All Images",
  "Landscape",
  "Mountains",
  "Forest",
  "Waterfalls",
  "Sunrise/Sunset",
  "Wildlife",
  "Adventure",
];

const sorts = ["Popular", "Newest", "Most Downloaded", "Most Liked"];

export function FilterBar() {
  const [activeFilter, setActiveFilter] = useState("All Images");
  const [activeSort, setActiveSort] = useState("Popular");

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
          Sort by:
        </span>
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer"
          >
            {sorts.map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
