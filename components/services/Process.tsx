import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ProcessProps {
  dict: Dictionary["servicesPage"]["process"];
}

export function Process({ dict }: ProcessProps) {
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

        <ul className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {dict.steps.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={Math.min((i % 2) * 120, 240)}>
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-5xl font-light leading-none text-primary md:text-6xl">{step.number}</span>
                  <h3 className="font-display text-2xl font-normal md:text-3xl">{step.title}</h3>
                </div>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}