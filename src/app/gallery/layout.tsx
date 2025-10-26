// src/app/(gallery)/layout.tsx
import { ImageModal } from "@/components/modal/ImageModal";
import { ImagePreloader } from "@/components/gallery/ImagePreloader";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-8xl">{children}</div>
      <ImageModal />
      <ImagePreloader />
    </>
  );
}
