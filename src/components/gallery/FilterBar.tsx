// src/components/gallery/FilterBar.tsx
"use client";

import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { FilterBarProps } from "@/types";
import { useState } from "react";

const sorts = ["Popular", "Newest", "Most Downloaded", "Most Liked"];

// Curated list of main categories
const mainCategories = [
  "All Images",
  "Landscape",
  "Mountains",
  "Forest",
  "Water",
  "Wildlife",
  "Adventure",
  "Sunrise/Sunset",
];

export function FilterBar({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  availableCategories = [],
  hasActiveFilter = false,
  onClearFilters,
}: FilterBarProps & {
  availableCategories?: string[];
  hasActiveFilter?: boolean;
  onClearFilters?: () => void;
}) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Use curated main categories instead of all available ones
  const displayFilters = mainCategories;

  // Get additional filters for the "More" dropdown
  const additionalFilters = availableCategories.filter(
    (category) =>
      !mainCategories.includes(category) && category !== "All Images"
  );

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      {/* Filter Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0">
          Filter by:
        </span>

        {/* Filter Chips Container */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
          {/* Main Filter Chips */}
          {displayFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`
                px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0
                ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/25 border-transparent"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                }
              `}
            >
              {filter}
            </button>
          ))}

          {/* More Filters Dropdown */}
          {additionalFilters.length > 0 && (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className={`
                  flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0
                  ${
                    showMoreFilters || additionalFilters.includes(activeFilter)
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600"
                  }
                `}
              >
                <SlidersHorizontal className="h-4 w-4" />
                More
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    showMoreFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* More Filters Dropdown Menu */}
              {showMoreFilters && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMoreFilters(false)}
                  />

                  {/* Dropdown Content */}
                  <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-2 min-w-[150px] max-h-60 overflow-y-auto">
                    {additionalFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          onFilterChange(filter);
                          setShowMoreFilters(false);
                        }}
                        className={`
                          w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700
                          ${
                            activeFilter === filter
                              ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                              : "text-slate-700 dark:text-slate-300"
                          }
                        `}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilter && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg whitespace-nowrap shrink-0"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Sort Section */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
          Sort by:
        </span>
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer min-w-[140px]"
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
