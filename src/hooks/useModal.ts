// src/hooks/useModal.ts
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { hikingImages } from "../../public/images/thumb/images";
import { useCallback } from "react";

export function useModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modalId = searchParams.get("modal");
  const image = hikingImages.find((img) => img.id === modalId);

  const openModal = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("modal", id);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const closeModal = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { image, openModal, closeModal };
}
