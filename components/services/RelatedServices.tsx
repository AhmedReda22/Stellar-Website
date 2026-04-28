import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface RelatedServicesProps {
  locale: Locale;
  label: string;
  services: Dictionary["servicesPage"]["services"];
  categoryLabels: Dictionary["servicesPage"]["filters"];
}

export function RelatedServices({ locale, label, services, categoryLabels }: RelatedServicesProps) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {label}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px border-t border-border bg-border md:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.slug} className="bg-surface">
              <Reveal delay={i * 120}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group flex h-full flex-col gap-4 p-8 transition-colors hover:bg-surface-muted/50 md:p-12"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-light text-ink-subtle transition-colors group-hover:text-primary">
                      {service.code}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {(categoryLabels as Record<string, string>)[service.category] ?? service.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-normal text-ink md:text-3xl">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{service.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-semibold uppercase tracking-wider text-ink transition-colors group-hover:text-primary">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}