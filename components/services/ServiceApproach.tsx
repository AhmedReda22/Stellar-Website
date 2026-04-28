import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ApproachItem {
  title: string;
  body: string;
}

interface ServiceApproachProps {
  label: string;
  items: ApproachItem[];
}

export function ServiceApproach({ label, items }: ServiceApproachProps) {
  return (
    <section className="bg-secondary py-24 text-white md:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {label}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
          {items.map((item, i) => (
            <li key={i}>
              <Reveal delay={Math.min(i * 120, 240)}>
                <span className="font-display text-4xl font-light text-primary md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl font-normal md:text-3xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}