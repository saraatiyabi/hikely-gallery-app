// src/components/gallery/FilterBar.tsx
"use client";

import { ChevronDown, X, SlidersHorizontal, Filter } from "lucide-react";
import { FilterBarProps } from "@/types";
import { useState, useEffect } from "react";
import { cn } from "@/lib/className";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use curated main categories instead of all available ones
  const displayFilters = mainCategories;

  // Get additional filters for the "More" section
  const additionalFilters = availableCategories.filter(
    (category) =>
      !mainCategories.includes(category) && category !== "All Images"
  );

  // Close mobile filters when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowMobileFilters(false);
    }
  }, [isMobile]);

  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    if (isMobile) {
      setShowMobileFilters(false);
    }
  };

  const handleClearAll = () => {
    onClearFilters?.();
    if (isMobile) {
      setShowMobileFilters(false);
    }
  };

  // Desktop Filter Bar
  if (!isMobile) {
    return (
      <div className="flex flex-col gap-4 mb-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        {/* Main Filters Row */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0">
            Filter by:
          </span>

          <div className="flex items-center gap-2 flex-wrap flex-1">
            {/* Main Filter Chips */}
            {displayFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0",
                  activeFilter === filter
                    ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/25 border-transparent"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                )}
              >
                {filter}
              </button>
            ))}

            {/* More Filters Toggle */}
            {additionalFilters.length > 0 && (
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0",
                  showMoreFilters || additionalFilters.includes(activeFilter)
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                More
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    showMoreFilters ? "rotate-180" : ""
                  )}
                />
              </button>
            )}

            {/* Clear Filters Button */}
            {hasActiveFilter && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg whitespace-nowrap shrink-0 ml-auto"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Additional Filters Row - Shown when "More" is clicked */}
        {showMoreFilters && additionalFilters.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
              More categories:
            </span>
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {additionalFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border shrink-0",
                    activeFilter === filter
                      ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/25 border-transparent"
                      : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort Section */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
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

  // Mobile Filter Bar
  return (
    <>
      {/* Mobile Filter Trigger */}
      <div className="flex items-center justify-between mb-4 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
            {(hasActiveFilter || activeSort !== "Popular") && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </button>

          {hasActiveFilter && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        {/* Active Filter/Sort Indicator */}
        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {activeFilter !== "All Images" && `Filter: ${activeFilter}`}
            {activeFilter !== "All Images" && activeSort !== "Popular" && " • "}
            {activeSort !== "Popular" && `Sort: ${activeSort}`}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Mobile Filters Panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 rounded-t-3xl shadow-2xl transform transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Filters & Sorting
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
              {/* Categories Section */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Categories
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[...displayFilters, ...additionalFilters].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterSelect(filter)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 border",
                        activeFilter === filter
                          ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg border-transparent"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-green-300 dark:hover:border-green-700"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Section */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Sort By
                </h4>
                <div className="space-y-2">
                  {sorts.map((sort) => (
                    <button
                      key={sort}
                      onClick={() => {
                        onSortChange(sort);
                        setShowMobileFilters(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 border",
                        activeSort === sort
                          ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg border-transparent"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-green-300 dark:hover:border-green-700"
                      )}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleClearAll}
                className="w-full py-3 px-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
