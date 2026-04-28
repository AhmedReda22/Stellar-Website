import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ValuesProps {
  dict: Dictionary["about"]["values"];
}

/**
 * Six values. After the long "Why Stellar" list, this section pivots back to
 * a calmer 2x3 grid — but the cards have NO borders, NO icons, NO hover
 * effects. Just typography and whitespace.
 *
 * The restraint is the design statement: confident brands don't decorate
 * their values, they just state them.
 */
export function Values({ dict }: ValuesProps) {
  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <div className="container">
        {/* Centered opener — switching alignment from previous section creates rhythm */}
        <div className="mx-auto max-w-2xl text-center">
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

        {/* 2x3 grid on desktop, stacked on mobile.
            No borders between cells — gap-only separation, lots of whitespace. */}
        <ul className="mx-auto mt-20 grid max-w-5xl gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((value, i) => (
            <li key={i}>
              <Reveal delay={Math.min((i % 3) * 100, 200)}>
                {/* Single magenta dot as ornament — replaces icons */}
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <h3 className="text-lg font-semibold text-ink md:text-xl">
                    {value.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                  {value.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
