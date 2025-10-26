// src/components/gallery/SearchBar.tsx
"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-slate-400 z-10" />
        <input
          type="text"
          placeholder="Search for hiking trails, mountains, nature..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-24 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm"
        />
        <div className="absolute right-2 flex items-center space-x-2">
          {/* <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors border-r border-slate-200 dark:border-slate-700">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button> */}
          <button className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 shadow-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
