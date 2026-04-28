import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface MissionVisionProps {
  mission: Dictionary["about"]["mission"];
  vision: Dictionary["about"]["vision"];
}

/**
 * Mission + Vision rendered as two side-by-side editorial blocks on desktop,
 * stacked on mobile. Each block follows the same anatomy — small label,
 * serif heading, body paragraph — but visually distinct via background.
 *
 * Mission sits on the muted surface (warm off-white).
 * Vision is inverted (dark surface, light text) for contrast and rhythm.
 *
 * The visual flip mid-page is intentional: it breaks the all-white feel and
 * signals "this isn't a generic corporate template."
 */
export function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <section className="border-y border-border">
      <div className="grid md:grid-cols-2">
        {/* Mission — light side */}
        <div className="bg-surface-muted px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {mission.label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight text-ink md:text-4xl lg:text-5xl">
              {mission.heading}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
              {mission.body}
            </p>
          </Reveal>
        </div>

        {/* Vision — dark side. Inverted palette, magenta accent stays.
            Border-start visible only on desktop (when columns sit beside each other). */}
        <div className="bg-secondary px-6 py-20 text-white md:px-12 md:py-28 md:border-s md:border-white/10 lg:px-20 lg:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {vision.label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              {vision.heading}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {vision.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
