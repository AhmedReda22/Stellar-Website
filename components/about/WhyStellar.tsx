import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface WhyStellarProps {
  dict: Dictionary["about"]["why"];
}

/**
 * "Why Stellar" — 8 reasons rendered as a numbered editorial list, not the
 * usual card grid. Each row: oversized serif numeral on the left, title and
 * body on the right, hairline divider between rows.
 *
 * This list-vs-grid choice is deliberate. Lists feel like serious firms
 * (McKinsey, BCG). Card grids feel like SaaS landing pages. We want the
 * former for healthcare consulting credibility.
 *
 * Hover state: the active row's numeral fades to magenta — single accent,
 * pulled in only on interaction.
 */
export function WhyStellar({ dict }: WhyStellarProps) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        {/* Section opener — eyebrow + heading, left-aligned, narrow column */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink md:text-5xl lg:text-6xl">
              {dict.heading}
            </h2>
          </Reveal>
        </div>

        {/* The list — 8 rows, hairline-divided. Generous vertical padding per row. */}
        <ul className="mt-16 border-t border-border md:mt-20">
          {dict.items.map((item, i) => (
            <li
              key={i}
              className="group border-b border-border transition-colors hover:bg-surface-muted/50"
            >
              <Reveal delay={Math.min(i * 60, 240)}>
                <div className="grid items-baseline gap-6 px-2 py-8 md:grid-cols-[120px_1fr_auto] md:px-6 md:py-10">
                  {/* Oversized serif numeral */}
                  <span className="font-display text-4xl font-light leading-none text-ink-subtle transition-colors group-hover:text-primary md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title + description block */}
                  <div className="md:max-w-2xl">
                    <h3 className="text-xl font-semibold text-ink md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>

                  {/* Subtle arrow on the end — appears on hover only */}
                  <span
                    aria-hidden
                    className="hidden h-px w-0 self-center bg-primary transition-all duration-500 group-hover:w-12 md:block"
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
