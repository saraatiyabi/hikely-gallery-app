// src/components/gallery/ImageGrid.tsx
"use client";

import Image from "next/image";
import { HikingImage } from "@/types";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/className";
import { useState, useEffect } from "react";
import { Download, Heart, User } from "lucide-react";

interface GridItem {
  image: HikingImage;
  className: string;
  mobileClassName?: string;
  tabletClassName?: string;
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

  // Responsive grid layout configuration
  const GRID_LAYOUT_CONFIG = [
    {
      id: "1",
      className: "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2",
      tabletClassName: "md:col-span-4 md:row-span-2",
      mobileClassName: "col-span-6 row-span-2",
    },
    {
      id: "2",
      className: "lg:col-start-3 lg:col-span-3 lg:row-start-1 lg:row-span-3",
      tabletClassName: "md:col-span-6 md:row-span-3",
      mobileClassName: "col-span-6 row-span-3",
    },
    {
      id: "3",
      className: "lg:col-start-6 lg:col-end-7 lg:row-start-1 lg:row-span-2",
      tabletClassName: "md:col-span-3 md:row-span-2",
      mobileClassName: "col-span-3 row-span-2",
    },
    {
      id: "4",
      className: "lg:col-start-7 lg:col-span-2 lg:row-start-1 lg:row-span-2",
      tabletClassName: "md:col-span-3 md:row-span-2",
      mobileClassName: "col-span-3 row-span-2",
    },
    {
      id: "5",
      className: "lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:row-span-3",
      tabletClassName: "md:col-span-4 md:row-span-3",
      mobileClassName: "col-span-4 row-span-3",
    },
    {
      id: "6",
      className: "lg:col-start-3 lg:col-span-2 lg:row-start-4 lg:row-span-2",
      tabletClassName: "md:col-span-4 md:row-span-2",
      mobileClassName: "col-span-4 row-span-2",
    },
    {
      id: "7",
      className: "lg:col-start-5 lg:col-span-1 lg:row-span-1",
      tabletClassName: "md:col-span-2 md:row-span-1",
      mobileClassName: "col-span-2 row-span-1",
    },
    {
      id: "8",
      className: "lg:col-start-6 lg:col-span-2 lg:row-start-3 lg:row-span-2",
      tabletClassName: "md:col-span-4 md:row-span-2",
      mobileClassName: "col-span-6 row-span-2",
    },
    {
      id: "9",
      className: "lg:col-start-8 lg:col-span-1 lg:row-start-3 lg:row-span-3",
      tabletClassName: "md:col-span-2 md:row-span-3",
      mobileClassName: "col-span-3 row-span-3",
    },
    {
      id: "10",
      className: "lg:col-start-1 lg:col-span-1 lg:row-start-6 lg:row-span-2",
      tabletClassName: "md:col-span-2 md:row-span-2",
      mobileClassName: "col-span-3 row-span-2",
    },
    {
      id: "11",
      className: "lg:col-start-2 lg:col-span-2 lg:row-start-6 lg:row-span-2",
      tabletClassName: "md:col-span-4 md:row-span-2",
      mobileClassName: "col-span-6 row-span-2",
    },
    {
      id: "12",
      className: "lg:col-start-4 lg:col-span-1 lg:row-start-6 lg:row-span-2",
      tabletClassName: "md:col-span-2 md:row-span-2",
      mobileClassName: "col-span-3 row-span-2",
    },
    {
      id: "13",
      className: "lg:col-start-5 lg:col-span-3 lg:row-start-5 lg:row-span-3",
      tabletClassName: "md:col-span-6 md:row-span-3",
      mobileClassName: "col-span-6 row-span-3",
    },
    {
      id: "14",
      className: "lg:col-start-8 lg:col-span-1 lg:row-start-6 lg:row-span-2",
      tabletClassName: "md:col-span-2 md:row-span-2",
      mobileClassName: "col-span-3 row-span-2",
    },
  ] as const;

  const gridLayout = GRID_LAYOUT_CONFIG.map((config) => {
    const image = images.find((img) => img.id === config.id);
    if (!image) return null;
    return {
      image,
      className: config.className,
      mobileClassName: config.mobileClassName,
      tabletClassName: config.tabletClassName,
    };
  }).filter((item): item is GridItem => item !== null);

  return (
    <div
      className={cn(
        "w-full p-4 bg-transparent",
        // Mobile: 6 columns, smaller gaps and rows
        "grid grid-cols-6 gap-2 auto-rows-[60px]",
        // Tablet: 6 columns, medium gaps and rows
        "md:grid-cols-6 md:gap-3 md:auto-rows-[80px]",
        // Desktop: 8 columns, standard gaps and rows
        "lg:grid-cols-8 lg:gap-4 lg:auto-rows-[120px]",
        // Large desktop: larger rows
        "xl:auto-rows-[140px]"
      )}
    >
      {gridLayout.map((item, index) => {
        const { image } = item;
        const isHovered = hoveredImage === image.id;
        const stat = stats[image.id] || { likes: 0, downloads: 0 };

        return (
          <div
            key={image.id}
            className={cn(
              "group relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300",
              "hover:shadow-lg lg:hover:shadow-2xl hover:z-10",
              "bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50",
              // Apply responsive classes
              item.mobileClassName,
              item.tabletClassName,
              item.className
            )}
            onClick={() => openModal(image.id)}
            onMouseEnter={() => !isMobile && setHoveredImage(image.id)}
            onMouseLeave={() => !isMobile && setHoveredImage(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(image.id)}
          >
            {/* Image */}
            <Image
              src={image.thumb}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className={cn(
                "object-cover transition-all duration-500",
                isHovered && !isMobile
                  ? "scale-105 lg:scale-110 brightness-110"
                  : "scale-100 brightness-90"
              )}
              priority={index < 8} // More priority images for mobile
            />

            {/* Gradient Overlay - Enhanced for mobile */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
                "flex flex-col justify-end p-2 md:p-3 lg:p-4",
                // Show overlay on mobile tap, hover on desktop
                isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                "transition-all duration-300"
              )}
            >
              {/* Image Info */}
              <div
                className={cn(
                  "transform transition-transform duration-300",
                  isMobile
                    ? "translate-y-0"
                    : "translate-y-2 md:translate-y-3 lg:translate-y-4 group-hover:translate-y-0"
                )}
              >
                <h3 className="text-white font-semibold text-xs md:text-sm line-clamp-2 mb-1 md:mb-2">
                  {image.title}
                </h3>

                {/* Author & Stats */}
                <div className="flex items-center justify-between text-[10px] md:text-xs text-white/80">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-slate-400 rounded-full flex items-center justify-center">
                      <User className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="hidden xs:inline">@hiker</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-2 h-2 md:w-3 md:h-3" />
                      <span className="text-[10px] md:text-xs">
                        {stat.likes}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-2 h-2 md:w-3 md:h-3" />
                      <span className="text-[10px] md:text-xs">
                        {stat.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Hidden on mobile, shown on tablet+ */}
              <div
                className={cn(
                  "items-center justify-between mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-white/20",
                  "transition-all duration-300",
                  isMobile
                    ? "hidden"
                    : "hidden md:flex transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                <button
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-1 lg:py-2 px-2 lg:px-3 rounded-lg backdrop-blur-sm transition-all duration-200 mr-2 flex items-center justify-center space-x-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add download logic here
                  }}
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  className="w-7 h-7 lg:w-8 lg:h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-3 h-3 lg:w-3 lg:h-3" />
                </button>
              </div>
            </div>

            {/* Free Badge */}
            <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 lg:top-3 lg:left-3">
              <span className="bg-green-500 text-white text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-sm">
                FREE
              </span>
            </div>

            {/* Resolution Badge - Hidden on mobile, shown on hover for tablet+ */}
            <div
              className={cn(
                "absolute top-1.5 right-1.5 md:top-2 md:right-2 lg:top-3 lg:right-3",
                isMobile
                  ? "hidden"
                  : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              )}
            >
              <span className="bg-black/50 text-white text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full backdrop-blur-sm">
                4K
              </span>
            </div>

            {/* Mobile Quick Actions */}
            {isMobile && (
              <div className="absolute bottom-1.5 right-1.5 flex items-center space-x-1">
                <button
                  className="w-6 h-6 bg-black/50 text-white rounded flex items-center justify-center backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add download logic here
                  }}
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  className="w-6 h-6 bg-black/50 text-white rounded flex items-center justify-center backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
