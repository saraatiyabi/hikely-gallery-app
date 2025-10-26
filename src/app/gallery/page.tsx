// src/app/(gallery)/page.tsx
"use client";

import { ImageGrid } from "@/components/gallery/ImageGrid";
import { SearchBar } from "@/components/gallery/SearchBar";
import { FilterBar } from "@/components/gallery/FilterBar";
import { hikingImages } from "../../../public/images/thumb/images";
import { useGallery } from "@/hooks/useGallery";
import { Search, X } from "lucide-react";

export default function GalleryPage() {
  const {
    // Search
    searchQuery,
    setSearchQuery,
    popularTags,
    clearSearch,
    hasSearch,

    // Filter
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    availableCategories,
    clearFilters,
    hasActiveFilter,

    // Combined
    filteredImages,
    resultsCount,
    totalCount,
    handleClearAll,
    hasAnyFilter,
  } = useGallery(hikingImages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-emerald-950/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50" />

        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/30 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                🏔️ Explore Nature's Wonders
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Hiking Trails
              </span>
              <br />
              <span className="text-3xl lg:text-5xl xl:text-6xl font-light text-slate-600 dark:text-slate-400">
                Gallery
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover breathtaking moments from the world's most beautiful
              trails.
              <span className="text-green-600 dark:text-green-400 font-medium">
                {" "}
                Free to use.{" "}
              </span>
              Curated by nature enthusiasts worldwide.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {totalCount}+ Premium Quality
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                4K Resolution
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Free Download
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="sticky top-16 z-40 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={clearSearch}
              popularTags={popularTags}
              onTagClick={setSearchQuery}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Combined Search & Filter Header */}
        {hasAnyFilter && (
          <div className="mb-6 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {hasSearch && hasActiveFilter
                    ? "Search & Filter Results"
                    : hasSearch
                    ? "Search Results"
                    : "Filtered Results"}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {hasSearch && hasActiveFilter
                    ? `Found ${resultsCount} image${
                        resultsCount !== 1 ? "s" : ""
                      } for "${searchQuery}" in ${activeFilter}`
                    : hasSearch
                    ? `Found ${resultsCount} image${
                        resultsCount !== 1 ? "s" : ""
                      } for "${searchQuery}"`
                    : `Showing ${resultsCount} image${
                        resultsCount !== 1 ? "s" : ""
                      } in ${activeFilter}`}
                </p>
              </div>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          availableCategories={availableCategories}
          hasActiveFilter={hasActiveFilter}
          onClearFilters={clearFilters}
        />

        {/* Image Grid */}
        <ImageGrid images={filteredImages} />

        {/* No Results State */}
        {hasAnyFilter && resultsCount === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No images found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {hasSearch && hasActiveFilter
                  ? `No results found for "${searchQuery}" in ${activeFilter}. Try different keywords or categories.`
                  : hasSearch
                  ? `No results found for "${searchQuery}". Try different keywords.`
                  : `No results found in ${activeFilter}. Try a different category.`}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-200 border border-green-200 dark:border-green-800"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Load More Section - Only show if not filtering and there are results */}
        {!hasAnyFilter && filteredImages.length > 0 && (
          <div className="text-center mt-16 mb-8">
            <button className="group relative overflow-hidden px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-slate-700 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 font-medium transition-colors">
                Load More Images
              </span>
              <div className="relative text-xs text-slate-500 dark:text-slate-500 mt-1">
                Showing {filteredImages.length} of 1,000+ images
              </div>
            </button>
          </div>
        )}

        {/* Show total count when filtering with results */}
        {hasAnyFilter && resultsCount > 0 && (
          <div className="text-center mt-8 mb-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Showing {resultsCount} of {totalCount} images
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
