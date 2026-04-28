"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { partners, type PartnerCategory } from "@/lib/content/partners";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  locale: Locale;
  dict: Dictionary["home"]["partners"];
}

type Tab = "all" | PartnerCategory;

export function PartnersSection({ locale, dict }: PartnersSectionProps) {
  const isRtl = locale === "ar";
  const [tab, setTab] = useState<Tab>("all");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      direction: isRtl ? "rtl" : "ltr",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 2500, stopOnMouseEnter: true })],
  );

  // Re-init Embla when the filter changes so it picks up the new slide count.
  useEffect(() => {
    emblaApi?.reInit();
  }, [tab, emblaApi]);

  const filtered = useMemo(
    () => (tab === "all" ? partners : partners.filter((p) => p.category === tab)),
    [tab],
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: dict.tabs.all },
    { id: "success", label: dict.tabs.success },
    { id: "accreditation", label: dict.tabs.accreditation },
    { id: "endorsing", label: dict.tabs.endorsing },
  ];

  return (
    <section className="bg-surface-muted py-20 md:py-28" id="partners">
      <div className="container">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.heading}
          subtitle={dict.subtitle}
          align="center"
        />

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Partner categories"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                tab === t.id
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-primary hover:text-primary",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="flex">
              {filtered.map((p) => (
                <li
                  key={`${tab}-${p.name}`}
                  className="min-w-0 shrink-0 grow-0 basis-1/2 px-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="flex h-28 items-center justify-center rounded-xl border border-border bg-surface-elevated p-4 shadow-soft transition-transform hover:scale-105">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={160}
                      height={80}
                      className="max-h-full max-w-full object-contain dark:brightness-100 dark:contrast-100"
                      // Some partner logos are dark — invert them when in dark mode if they appear too dark.
                      // Per-logo overrides can be added here later if needed.
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Slider controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <svg
                className="h-4 w-4 rtl:rotate-180"
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
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <svg
                className="h-4 w-4 rtl:rotate-180"
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
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/partners`}
            className="rounded-full border-2 border-primary px-7 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {dict.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
