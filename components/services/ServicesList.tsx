"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface ServicesListProps {
  locale: Locale;
  services: Dictionary["servicesPage"]["services"];
  filters: Dictionary["servicesPage"]["filters"];
  viewServiceLabel: string;
}

export function ServicesList({ locale, services, filters, viewServiceLabel }: ServicesListProps) {
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const s of services) {
      if (!seen.has(s.category)) {
        seen.add(s.category);
        ordered.push(s.category);
      }
    }
    return ordered;
  }, [services]);

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const visibleServices = useMemo(() => {
    if (activeFilter === "all") return services;
    return services.filter((s) => s.category === activeFilter);
  }, [services, activeFilter]);

  return (
    <section className="bg-surface py-20 md:py-28" id="services-list">
      <div className="container">
        <div role="tablist" aria-label="Filter services" className="flex flex-wrap gap-2">
          <FilterPill label={filters.all} active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={(filters as Record<string, string>)[cat] ?? cat}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            />
          ))}
        </div>

        <ul className="mt-12 border-t border-border md:mt-16">
          {visibleServices.map((service, i) => (
            <li key={service.slug} className="border-b border-border">
              <Reveal delay={Math.min(i * 60, 240)}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group grid items-center gap-6 px-2 py-8 transition-colors hover:bg-surface-muted/60 md:grid-cols-[100px_1fr_auto] md:px-6 md:py-10"
                >
                  <span className="font-display text-4xl font-light leading-none text-ink-subtle transition-colors group-hover:text-primary md:text-5xl">
                    {service.code}
                  </span>

                  <div className="md:max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {(filters as Record<string, string>)[service.category] ?? service.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-normal text-ink md:text-3xl lg:text-4xl">{service.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{service.summary}</p>
                  </div>

                  <span className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-subtle transition-colors group-hover:text-primary md:inline-flex">
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">{viewServiceLabel}</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-transparent text-ink-muted hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}