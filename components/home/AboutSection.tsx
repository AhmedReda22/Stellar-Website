import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

interface AboutSectionProps {
  locale: Locale;
  dict: Dictionary["home"]["about"];
}

export function AboutSection({ locale, dict }: AboutSectionProps) {
  // Stats data — counter target + suffix + label key. Suffixes match the
  // original site's display ("15", "2000+", "8", "98%").
  const stats: { end: number; suffix: string; icon: string; label: string }[] = [
    { end: 15, suffix: "", icon: "🏆", label: dict.stats.years },
    { end: 2000, suffix: "+", icon: "🚀", label: dict.stats.projects },
    { end: 8, suffix: "", icon: "🌍", label: dict.stats.countries },
    { end: 98, suffix: "%", icon: "💯", label: dict.stats.satisfaction },
  ];

  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 md:py-28" id="about">
      {/* Decorative dots/blob — pure CSS, matches original "animated-dots" + pulse-circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-soft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-20 bottom-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl animate-pulse-soft"
      />

      <div className="container relative">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.brandName}
          align="center"
        />

        <div className="mx-auto mt-10 max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-ink md:text-3xl">
            {dict.heading}{" "}
            <span className="text-primary">{dict.headingHighlight}</span>
          </h3>
          <div className="my-6 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary">✧</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* Quote-style intro, replaces the original quote-icon + highlighted-text */}
          <blockquote className="relative px-6 text-base leading-relaxed text-ink-muted md:text-lg">
            <span
              aria-hidden
              className="absolute -top-4 start-0 text-6xl font-serif leading-none text-primary/20 md:text-7xl"
            >
              &ldquo;
            </span>
            <p>{dict.intro}</p>
            <p className="mt-4">{dict.introContinued}</p>
          </blockquote>
        </div>

        {/* Stats grid */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              {/* Hover sweep */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary-light opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="text-3xl" aria-hidden>
                {stat.icon}
              </div>
              <div className="mt-3 text-3xl font-bold text-primary md:text-4xl">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wide text-ink-muted">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href={`/${locale}/about`}
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
          >
            {dict.cta}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
