import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface PartnersStatsProps {
  dict: Dictionary["partnersPage"]["stats"];
}

export function PartnersStats({ dict }: PartnersStatsProps) {
  return (
    <section className="bg-secondary py-24 text-white md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
              {dict.heading}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((stat, i) => (
            <li key={i}>
              <Reveal delay={Math.min(i * 100, 300)}>
                <p className="font-display text-6xl font-light leading-none text-primary md:text-7xl lg:text-8xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}