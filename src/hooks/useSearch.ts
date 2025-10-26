// src/hooks/useSearch.ts
"use client";

import { useState, useMemo } from "react";
import { HikingImage } from "@/types";

export function useSearch(images: HikingImage[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) {
      return images;
    }

    const query = searchQuery.toLowerCase().trim();

    return images.filter((image) => {
      // Search in title
      const titleMatch = image.title.toLowerCase().includes(query);

      // Search in tags
      const tagMatch = image.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      // Search in location
      const locationMatch = image.location.toLowerCase().includes(query);

      // Search in description
      const descriptionMatch = image.description.toLowerCase().includes(query);

      return titleMatch || tagMatch || locationMatch || descriptionMatch;
    });
  }, [images, searchQuery]);

  const popularTags = useMemo(() => {
    const allTags = images.flatMap((image) => image.tags);
    const tagCounts: Record<string, number> = {};

    allTags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [images]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredImages,
    popularTags,
    clearSearch,
    hasSearch: searchQuery.trim().length > 0,
    resultsCount: filteredImages.length,
    totalCount: images.length,
  };
}
