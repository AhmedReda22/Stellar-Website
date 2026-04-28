import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ServiceCapabilitiesProps {
  label: string;
  deliverables: Dictionary["servicesPage"]["services"][number]["deliverables"];
}

export function ServiceCapabilities({ label, deliverables }: ServiceCapabilitiesProps) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {label}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, i) => (
            <li key={i} className="border-b border-border">
              <Reveal delay={Math.min((i % 3) * 80, 160)}>
                <div className="flex items-baseline gap-4 py-6 md:py-8">
                  <span className="font-display text-sm font-normal text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-normal text-ink md:text-2xl">{item}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}