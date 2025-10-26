// src/hooks/useGallery.ts
"use client";

import { useMemo } from "react";
import { HikingImage } from "@/types";
import { useSearch } from "./useSearch";
import { useFilter } from "./useFilter";

export function useGallery(images: HikingImage[]) {
  const {
    searchQuery,
    setSearchQuery,
    filteredImages: searchFilteredImages,
    popularTags,
    clearSearch,
    hasSearch,
    resultsCount: searchResultsCount,
    totalCount,
  } = useSearch(images);

  const {
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    filteredImages: categoryFilteredImages,
    availableCategories,
    clearFilters,
    hasActiveFilter,
  } = useFilter(images);

  // Combine search and filter: apply both independently
  const finalFilteredImages = useMemo(() => {
    // If both search and filter are active, find intersection
    if (hasSearch && hasActiveFilter) {
      const searchIds = new Set(searchFilteredImages.map((img) => img.id));
      return categoryFilteredImages.filter((img) => searchIds.has(img.id));
    }

    // If only search is active
    if (hasSearch) {
      return searchFilteredImages;
    }

    // If only filter is active
    if (hasActiveFilter) {
      return categoryFilteredImages;
    }

    // If neither is active, return all images
    return images;
  }, [
    searchFilteredImages,
    categoryFilteredImages,
    images,
    hasSearch,
    hasActiveFilter,
  ]);

  const finalResultsCount = finalFilteredImages.length;

  const handleClearAll = () => {
    clearSearch();
    clearFilters();
  };

  const hasAnyFilter = hasSearch || hasActiveFilter;

  return {
    // Search state
    searchQuery,
    setSearchQuery,
    popularTags,
    clearSearch,
    hasSearch,

    // Filter state
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    availableCategories,
    clearFilters,
    hasActiveFilter,

    // Combined state
    filteredImages: finalFilteredImages,
    resultsCount: finalResultsCount,
    totalCount,
    handleClearAll,
    hasAnyFilter,
  };
}
