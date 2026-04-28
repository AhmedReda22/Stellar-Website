import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ServicesIntroProps {
  dict: Dictionary["servicesPage"]["intro"];
}

export function ServicesIntro({ dict }: ServicesIntroProps) {
  return (
    <section className="border-y border-border bg-surface-muted py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.label}
            </p>
          </Reveal>

          <div className="md:col-span-2">
            <Reveal delay={100}>
              <h2 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl lg:text-5xl">
                {dict.heading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
                {dict.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}