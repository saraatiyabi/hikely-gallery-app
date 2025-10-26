// src/components/modal/ImageModal.tsx
"use client";

import Image from "next/image";
import { X, MapPin, Calendar, Tag } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/className";

export function ImageModal() {
  const { image, closeModal } = useModal();

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeModal}
    >
      <article
        className={cn(
          "relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden",
          "animate-in fade-in zoom-in duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-video">
          <Image
            src={image.full}
            alt={image.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">{image.title}</h2>
          <p className="text-muted-foreground">{image.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{image.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{image.date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {image.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-muted rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
