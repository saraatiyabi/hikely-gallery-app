// src/app/(gallery)/page.tsx
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { SearchBar } from "@/components/gallery/SearchBar";
import { FilterBar } from "@/components/gallery/FilterBar";
import { hikingImages } from "../../../public/images/thumb/images";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiking Gallery | Explore Nature's Beauty",
  description:
    "Discover breathtaking hiking destinations and moments from the world's most beautiful trails.",
};

export default function GalleryPage() {
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
                {hikingImages.length}+ Premium Quality
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
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <FilterBar />

        {/* Image Grid */}
        <ImageGrid images={hikingImages} />

        {/* Load More Section */}
        <div className="text-center mt-16 mb-8">
          <button className="group relative overflow-hidden px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-slate-700 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 font-medium transition-colors">
              Load More Images
            </span>
            <div className="relative text-xs text-slate-500 dark:text-slate-500 mt-1">
              Showing {hikingImages.length} of 1,000+ images
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
