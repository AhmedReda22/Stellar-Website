import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface MissionVisionProps {
  mission: Dictionary["about"]["mission"];
  vision: Dictionary["about"]["vision"];
}

export function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <section className="border-y border-border">
      <div className="grid md:grid-cols-2">
        {/* Mission — light side */}
        <div className="bg-surface-muted px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-lg shadow-primary/10">
              <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {mission.label}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-ink md:text-4xl lg:text-5xl">
              {mission.heading}
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
              {mission.body}
            </p>
          </Reveal>
        </div>

        {/* Vision — dark side */}
        <div className="bg-secondary px-6 py-20 text-white md:border-s md:border-white/10 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 shadow-lg">
              <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {vision.label}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              {vision.heading}
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {vision.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}