import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ServiceDetailHeroProps {
  locale: Locale;
  service: Dictionary["servicesPage"]["services"][number];
  category: string;
  backLabel: string;
}

export function ServiceDetailHero({ locale, service, category, backLabel }: ServiceDetailHeroProps) {
  return (
    <section className="bg-surface pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container">
        <Reveal>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-primary"
          >
            <svg className="h-3 w-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        </Reveal>

        <div className="mt-12 flex items-baseline gap-6 md:mt-16 md:gap-10">
          <Reveal>
            <span className="font-display text-5xl font-light leading-none text-ink-subtle md:text-7xl">
              {service.code}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {category}
            </p>
          </Reveal>
        </div>

        <h1 className="mt-8 max-w-5xl font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-6xl lg:text-7xl">
          <Reveal delay={200}>
            <span>{service.title}</span>
          </Reveal>
        </h1>

        <Reveal delay={400}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {service.summary}
          </p>
        </Reveal>
      </div>
    </section>
  );
}