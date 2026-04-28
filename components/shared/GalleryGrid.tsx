"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/content/gallery";
import { GalleryLightbox } from "./GalleryLightbox";
import { cn } from "@/lib/utils";

type Filter = "all" | GalleryCategory;

interface GalleryGridProps {
  /** Filter labels (i18n) */
  filters: { all: string; events: string; booth: string; training: string; digital: string };
  /** Maximum number of items shown — used by the homepage section to render a preview */
  limit?: number;
  /** Whether to show the filter bar (homepage shows it; some other pages may not) */
  showFilters?: boolean;
  photoCountTemplate: string;
}

export function GalleryGrid({
  filters,
  limit,
  showFilters = true,
  photoCountTemplate,
}: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = useMemo(() => {
    const base =
      filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);
    return limit ? base.slice(0, limit) : base;
  }, [filter, limit]);

  const filterTabs: { id: Filter; label: string }[] = [
    { id: "all", label: filters.all },
    { id: "events", label: filters.events },
    { id: "booth", label: filters.booth },
    { id: "training", label: filters.training },
    { id: "digital", label: filters.digital },
  ];

  return (
    <>
      {showFilters && (
        <div
          role="tablist"
          aria-label="Gallery filters"
          className="flex flex-wrap justify-center gap-2"
        >
          {filterTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={filter === t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                filter === t.id
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-primary hover:text-primary",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary"
              aria-label={`Open gallery: ${item.title}`}
            >
              <Image
                src={item.cover}
                alt={item.title}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent p-5 opacity-90 transition-opacity group-hover:opacity-100">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-white/80">
                  {item.location && (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    {photoCountTemplate.replace("{count}", String(item.photoCount))}
                  </span>
                </div>
              </div>
              {/* Zoom indicator */}
              <span className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <GalleryLightbox
          title={active.title}
          images={[active.cover, ...active.images]}
          startIndex={0}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
