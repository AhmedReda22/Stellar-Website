import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";

interface ServicesSectionProps {
  locale: Locale;
  dict: Dictionary["home"]["servicesSection"];
}

export function ServicesSection({ locale, dict }: ServicesSectionProps) {
  // Order kept identical to the original homepage layout.
  const services = [
    {
      key: "advertising",
      href: "/services/healthcare-advertising",
      icon: "/images/event.png",
      ...dict.items.advertising,
    },
    {
      key: "medicalAffairs",
      href: "/services/medical-affairs",
      icon: "/images/innovation.png",
      ...dict.items.medicalAffairs,
    },
    {
      key: "marketAccess",
      href: "/services/market-access",
      icon: "/images/workshop.png",
      ...dict.items.marketAccess,
    },
    {
      key: "healthSystem",
      href: "/services/health-system-partnerships",
      icon: "/images/marketing.png",
      ...dict.items.healthSystem,
    },
    {
      key: "technology",
      href: "/services/technology-services",
      icon: "/images/research.png",
      ...dict.items.technology,
    },
  ];

  return (
    <section className="bg-surface py-20 md:py-28" id="services">
      <div className="container">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.heading}
          align="center"
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.key}>
              <ServiceCard
                href={`/${locale}/services${service.href.replace("/services", "")}`}
                title={service.title}
                description={service.description}
                iconSrc={service.icon}
                iconAlt={service.title}
              />
            </li>
          ))}

          {/* Sixth slot — "Explore all services" CTA card. Visually different
              from the service cards: dark background, no icon, big arrow,
              acts as the entry point to the full /services page. */}
          <li>
            <Link
              href={`/${locale}/services`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-secondary p-7 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              {/* Decorative gradient blob — subtle motion on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-primary/50"
              />

              <div className="relative">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {dict.eyebrow} {dict.heading}
                </span>
                <h3 className="mt-4 font-display text-2xl font-light leading-tight md:text-3xl">
  {dict.viewAllTitle}
</h3>
<p className="mt-3 text-sm leading-relaxed text-white/70">
  {dict.viewAllBody}
</p>
              </div>

              {/* Big arrow — the visual cue this is an action, not info */}
              <div className="relative mt-6 inline-flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wider">
  {dict.viewAllButton}
</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-all group-hover:scale-110 group-hover:bg-primary-light">
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}