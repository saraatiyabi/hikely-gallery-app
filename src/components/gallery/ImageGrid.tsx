// src/components/gallery/ImageGrid.tsx
"use client";

import Image from "next/image";
import { HikingImage } from "@/types";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/className";
import { useState, useEffect } from "react";

interface GridItem {
  image: HikingImage;
  className: string;
}

interface ImageGridProps {
  images: HikingImage[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const { openModal } = useModal();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [stats, setStats] = useState<
    Record<string, { likes: number; downloads: number }>
  >({});

  // Generate stats only on client, once
  useEffect(() => {
    const newStats: typeof stats = {};
    images.forEach((img) => {
      newStats[img.id] = {
        likes: Math.floor(Math.random() * 100) + 20,
        downloads: Math.floor(Math.random() * 50) + 5,
      };
    });
    setStats(newStats);
  }, [images]);

  const GRID_LAYOUT_CONFIG = [
    { id: "1", className: "col-start-1 col-span-2 row-start-1 row-span-2" },
    { id: "2", className: "col-start-3 col-span-3 row-start-1 row-span-3" },
    { id: "3", className: "col-start-6 col-end-7 row-start-1 row-span-2" },
    { id: "4", className: "col-start-7 col-span-2 row-start-1 row-span-2" },
    { id: "5", className: "col-start-1 col-span-2 row-start-3 row-span-3" },
    { id: "6", className: "col-start-3 col-span-2 row-start-4 row-span-2" },
    { id: "7", className: "col-start-5 col-span-1 row-span-1" },
    { id: "8", className: "col-start-6 col-span-2 row-start-3 row-span-2" },
    { id: "9", className: "col-start-8 col-span-1 row-start-3 row-span-3" },
    { id: "10", className: "col-start-1 col-span-1 row-start-6 row-span-2" },
    { id: "11", className: "col-start-2 col-span-2 row-start-6 row-span-2" },
    { id: "12", className: "col-start-4 col-span-1 row-start-6 row-span-2" },
    { id: "13", className: "col-start-5 col-span-3 row-start-5 row-span-3" },
    { id: "14", className: "col-start-8 col-span-1 row-start-6 row-span-2" },
  ] as const;

  const gridLayout: GridItem[] = GRID_LAYOUT_CONFIG.map((config) => {
    const image = images.find((img) => img.id === config.id);
    if (!image) return null;
    return { image, className: config.className };
  }).filter((item): item is GridItem => item !== null);

  return (
    <div className="w-full h-screen mobile-grid-fix p-4 bg-transparent grid grid-cols-8 grid-rows-7 gap-4 auto-rows-[120px] md:auto-rows-[140px]">
      {gridLayout.map((item) => {
        const { image } = item;
        const isHovered = hoveredImage === image.id;
        const stat = stats[image.id] || { likes: 0, downloads: 0 };

        return (
          <div
            key={image.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500",
              "hover:shadow-2xl hover:z-10",
              "bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50",
              item.className
            )}
            onClick={() => openModal(image.id)}
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(image.id)}
          >
            {/* Image */}
            <Image
              src={image.thumb}
              alt={image.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-700",
                isHovered
                  ? "scale-110 brightness-110"
                  : "scale-100 brightness-90"
              )}
              priority={gridLayout.indexOf(item) < 4}
            />

            {/* Gradient Overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0",
                "opacity-0 group-hover:opacity-100 transition-all duration-500",
                "flex flex-col justify-end p-4"
              )}
            >
              {/* Image Info */}
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                  {image.title}
                </h3>

                {/* Author & Stats */}
                <div className="flex items-center justify-between text-xs text-white/80">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">User</span>
                    </div>
                    <span>@hiker</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span>Heart</span>
                      <span>{stat.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Download</span>
                      <span>{stat.downloads}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={cn(
                  "flex items-center justify-between mt-3 pt-3 border-t border-white/20",
                  "transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                  "transition-all duration-500 delay-100"
                )}
              >
                <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-3 rounded-lg backdrop-blur-sm transition-all duration-200 mr-2">
                  Quick Download
                </button>
                <button className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                  <span className="text-sm">Heart</span>
                </button>
              </div>
            </div>

            {/* Free Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                FREE
              </span>
            </div>

            {/* Resolution Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                4K
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
