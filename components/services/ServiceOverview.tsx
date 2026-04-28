import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ServiceOverviewProps {
  overviewLabel: string;
  overview: string;
  stats: { projects: string; clients: string; countries: string };
  statLabels: { projects: string; clients: string; countries: string };
}

export function ServiceOverview({ overviewLabel, overview, stats, statLabels }: ServiceOverviewProps) {
  return (
    <section className="border-y border-border bg-surface-muted py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {overviewLabel}
            </p>
          </Reveal>

          <div className="lg:col-span-2">
            <Reveal delay={100}>
              <p className="font-display text-2xl font-light leading-relaxed text-ink md:text-3xl lg:text-4xl">
                {overview}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:mt-20 md:grid-cols-3 md:gap-6 md:pt-16">
          <Reveal delay={100}>
            <div>
              <p className="font-display text-5xl font-light leading-none text-primary md:text-6xl">{stats.projects}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{statLabels.projects}</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p className="font-display text-5xl font-light leading-none text-primary md:text-6xl">{stats.clients}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{statLabels.clients}</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div>
              <p className="font-display text-5xl font-light leading-none text-primary md:text-6xl">{stats.countries}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{statLabels.countries}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}