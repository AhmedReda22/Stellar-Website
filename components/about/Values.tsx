import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ValuesProps {
  dict: Dictionary["about"]["values"];
}

const valueIcons = [
  "/images/respect.png",
  "/images/passion.png",
  "/images/attitude.png",
  "/images/result.png",
  "/images/ownership.png",
  "/images/quality.png",
];

export function Values({ dict }: ValuesProps) {
  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <div className="container">
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

        <ul className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-3 lg:gap-16">
          {dict.items.map((value, i) => (
            <li key={i} className="flex flex-col items-center text-center">
              <Reveal delay={Math.min((i % 3) * 100, 200)}>
                <div className="group flex flex-col items-center transition-transform hover:-translate-y-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-3 border-primary bg-white shadow-lg transition-transform group-hover:scale-110">
                    <img src={valueIcons[i]} alt="" className="h-12 w-12 object-contain" />
                  </div>
                  <p className="mt-5 text-base font-bold text-ink md:text-lg">
                    {value.title}
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