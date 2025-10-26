// src/components/gallery/ImageCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { HikingImage } from "@/types";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/className";

interface ImageCardProps {
  image: HikingImage;
  priority?: boolean;
}

export function ImageCard({ image, priority = false }: ImageCardProps) {
  const { openModal } = useModal();

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-lg",
        "transition-all duration-300 hover:shadow-2xl",
        "cursor-pointer"
      )}
      onClick={() => openModal(image.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openModal(image.id)}
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={image.thumb}
          alt={image.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-semibold text-lg truncate">{image.title}</h3>
        <p className="text-sm opacity-90">{image.location}</p>
      </div>

      {/* Hidden link for SEO & shareability */}
      <Link href={`/image/${image.id}`} className="sr-only">
        View {image.title}
      </Link>
    </article>
  );
}
