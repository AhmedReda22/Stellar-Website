"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { partners, type PartnerCategory } from "@/lib/content/partners";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface PartnersGridProps {
  filters: Dictionary["partnersPage"]["filters"];
  categoryDescriptions: Dictionary["partnersPage"]["categoryDescriptions"];
}

type Filter = "all" | PartnerCategory;

export function PartnersGrid({ filters, categoryDescriptions }: PartnersGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visiblePartners = useMemo(() => {
    if (activeFilter === "all") return partners;
    return partners.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: filters.all },
    { id: "success", label: filters.success },
    { id: "accreditation", label: filters.accreditation },
    { id: "endorsing", label: filters.endorsing },
  ];

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        {/* Filter pills */}
        <div role="tablist" aria-label="Filter partners by category" className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                activeFilter === tab.id
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-transparent text-ink-muted hover:border-primary hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category description — appears below filter when a category is selected */}
        {activeFilter !== "all" && (
          <Reveal>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              {categoryDescriptions[activeFilter]}
            </p>
          </Reveal>
        )}

        {/* Logo grid — 3 cols mobile, 4 cols tablet, 6 cols desktop */}
        <ul className="mt-12 grid grid-cols-3 gap-px border border-border bg-border md:mt-16 md:grid-cols-4 lg:grid-cols-6">
          {visiblePartners.map((partner, i) => (
            <li key={`${activeFilter}-${partner.name}`} className="bg-surface">
              <Reveal delay={Math.min((i % 12) * 30, 300)}>
                <div className="group flex aspect-square items-center justify-center p-6 transition-colors hover:bg-surface-muted md:p-8">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="max-h-full max-w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Total count — small footnote */}
        <p className="mt-8 text-xs uppercase tracking-wider text-ink-subtle">
          {visiblePartners.length} {activeFilter === "all" ? filters.all.toLowerCase() : ""}
        </p>
      </div>
    </section>
  );
}