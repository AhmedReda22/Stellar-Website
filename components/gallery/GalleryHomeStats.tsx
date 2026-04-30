"use client";

import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function GalleryHomeStats() {
  const stats = [
    { end: 240, suffix: "+", icon: "🎪", label: "Events delivered" },
    { end: 8, suffix: "", icon: "🌍", label: "Countries" },
    { end: 100, suffix: "K+", icon: "🩺", label: "HCPs engaged" },
    { end: 15, suffix: "", icon: "📅", label: "Years building" },
  ];

  return (
    <section className="bg-surface py-10 md:py-16">
      <div className="container">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={Math.min(i * 80, 240)}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary-light opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="text-3xl" aria-hidden>{stat.icon}</div>
                  <div className="mt-3 text-3xl font-bold text-primary md:text-4xl">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-medium uppercase tracking-wide text-ink-muted">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}