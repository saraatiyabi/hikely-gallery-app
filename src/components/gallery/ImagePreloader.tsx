// src/components/gallery/ImagePreloader.tsx
"use client";

import { useEffect, useRef } from "react";
import { hikingImages } from "../../../public/images/thumb/images";

export function ImagePreloader() {
  const preloaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest("[data-image-id]");
      if (!card) return;

      const id = card.getAttribute("data-image-id");
      if (!id || preloaded.current.has(id)) return;

      const image = hikingImages.find((img) => img.id === id);
      if (!image) return;

      const img = new window.Image();
      img.src = image.full;
      preloaded.current.add(id);
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return null;
}
