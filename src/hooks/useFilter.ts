// src/hooks/useFilter.ts
"use client";

import { useState, useMemo } from "react";
import { HikingImage } from "@/types";

export function useFilter(images: HikingImage[]) {
  const [activeFilter, setActiveFilter] = useState("All Images");
  const [activeSort, setActiveSort] = useState("Popular");

  // Extract unique categories from images
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    images.forEach((image) => {
      image.tags.forEach((tag) => {
        // Convert tag to category format (capitalize, etc.)
        const category = tag
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        categories.add(category);
      });
    });
    return ["All Images", ...Array.from(categories).sort()];
  }, [images]);

  // Filter images based on active filter
  const filteredImages = useMemo(() => {
    let filtered = images;

    // Apply category filter
    if (activeFilter !== "All Images") {
      const filterLower = activeFilter.toLowerCase().replace(" ", "-");
      filtered = images.filter((image) =>
        image.tags.some(
          (tag) =>
            tag.toLowerCase().includes(filterLower) ||
            image.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
            image.location.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );
    }

    // Apply sorting
    switch (activeSort) {
      case "Newest":
        // Sort by date (assuming newer dates are later)
        filtered = [...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Most Downloaded":
        // Sort by downloads (you'll need to add download counts to your data)
        filtered = [...filtered].sort(
          (a, b) => (b.downloads || 0) - (a.downloads || 0)
        );
        break;
      case "Most Liked":
        // Sort by likes (you'll need to add like counts to your data)
        filtered = [...filtered].sort(
          (a, b) => (b.likes || 0) - (a.likes || 0)
        );
        break;
      case "Popular":
      default:
        // Default sorting (you can implement popularity algorithm)
        // For now, just maintain original order or sort by a combination of factors
        break;
    }

    return filtered;
  }, [images, activeFilter, activeSort]);

  const clearFilters = () => {
    setActiveFilter("All Images");
    setActiveSort("Popular");
  };

  return {
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    filteredImages,
    availableCategories,
    clearFilters,
    hasActiveFilter: activeFilter !== "All Images" || activeSort !== "Popular",
  };
}
