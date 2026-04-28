import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface GalleryStatsProps {
  stats: Dictionary["galleryPage"]["stats"];
}

/**
 * Compact stats bar — sits between the intro and the gallery itself.
 * Lighter visual weight than the dark stats sections elsewhere; just a row
 * of numbers separated by hairline dividers, no background block.
 */
export function GalleryStats({ stats }: GalleryStatsProps) {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container">
        <ul className="grid gap-px border-y border-border bg-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <li key={i} className="bg-surface">
              <Reveal delay={Math.min(i * 80, 240)}>
                <div className="px-2 py-10 text-center md:px-6 md:py-12 md:text-start">
                  <p className="font-display text-5xl font-light leading-none text-primary md:text-6xl lg:text-7xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}