"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  images: string[];
  startIndex: number;
  title?: string;
  onClose: () => void;
}

/**
 * Full-screen lightbox shown when a gallery item is clicked.
 * - Esc closes
 * - ←/→ navigate
 * - Click backdrop closes
 */
export function GalleryLightbox({
  images,
  startIndex,
  title,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 text-white">
          <span className="text-sm font-medium">
            {title} <span className="opacity-60">— {index + 1} / {images.length}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full bg-white/10 p-2 hover:bg-white/20"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="relative flex flex-1 items-center justify-center p-4">
          <div className="relative h-full w-full max-w-5xl">
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${title ?? "Photo"} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain animate-fade-in"
              priority
            />
          </div>

          {/* Prev / next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className={cn(
                  "absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition-colors hover:bg-white/30",
                )}
              >
                <svg
                  className="h-6 w-6 rtl:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className={cn(
                  "absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition-colors hover:bg-white/30",
                )}
              >
                <svg
                  className="h-6 w-6 rtl:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 overflow-x-auto p-4 pb-6 no-scrollbar">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all",
                  i === index
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-black"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
