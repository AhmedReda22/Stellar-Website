"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { partners, type PartnerCategory } from "@/lib/content/partners";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface PartnersGridProps {
  filters: Dictionary["partnersPage"]["filters"];

  /**
   * Kept optional so existing page code does not break
   * if it is still passing categoryDescriptions.
   * We are not rendering this text anymore.
   */
  categoryDescriptions?: Dictionary["partnersPage"]["categoryDescriptions"];
}

type Filter = "all" | PartnerCategory;

export function PartnersGrid({ filters }: PartnersGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visiblePartners = useMemo(() => {
    if (activeFilter === "all") return partners;
    return partners.filter((partner) => partner.category === activeFilter);
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
        <div
          role="tablist"
          aria-label="Filter partners by category"
          className="flex flex-wrap gap-2"
        >
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

        {/* Clean logo grid — no blocks, no borders, logos always colored */}
        <ul className="mt-12 grid grid-cols-3 items-center gap-x-8 gap-y-12 md:mt-16 md:grid-cols-4 md:gap-x-12 md:gap-y-16 lg:grid-cols-6">
          {visiblePartners.map((partner, index) => (
            <li key={`${activeFilter}-${partner.name}`}>
              <Reveal delay={Math.min((index % 12) * 30, 300)}>
                <div className="flex h-20 items-center justify-center md:h-24">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={100}
                    className="max-h-full max-w-full object-contain opacity-100 grayscale-0 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}