import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface LocationsProps {
  dict: Dictionary["contact"]["locations"];
}

function getOfficeFlag(office: Dictionary["contact"]["locations"]["offices"][number]) {
  const value = `${office.code} ${office.country} ${office.city}`.toLowerCase();

  if (
    value.includes("uae") ||
    value.includes("united arab emirates") ||
    value.includes("dubai")
  ) {
    return {
      src: "/images/flags/UAE.png",
      alt: "UAE flag",
    };
  }

  if (
    value.includes("ksa") ||
    value.includes("saudi") ||
    value.includes("riyadh")
  ) {
    return {
      src: "/images/flags/KSA.png",
      alt: "Saudi Arabia flag",
    };
  }

  if (
    value.includes("eg") ||
    value.includes("egypt") ||
    value.includes("cairo")
  ) {
    return {
      src: "/images/flags/EG.png",
      alt: "Egypt flag",
    };
  }

  return null;
}

export function Locations({ dict }: LocationsProps) {
  return (
    <section className="border-t border-border bg-surface-muted py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink md:text-5xl lg:text-6xl">
              {dict.heading}{" "}
              <span className="text-primary">{dict.headingHighlight}</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              {dict.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-border md:mt-20 md:grid-cols-3 md:border-t-0">
          {dict.offices.map((office, i) => {
            const flag = getOfficeFlag(office);

            return (
              <Reveal key={i} delay={i * 120}>
                <div
                  className={[
                    "py-10 md:py-12",
                    i > 0 ? "border-t border-border md:border-t-0" : "",
                    i > 0 ? "md:border-s md:border-border md:ps-10 lg:ps-14" : "",
                    i < dict.offices.length - 1 ? "md:pe-10 lg:pe-14" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="flex items-center gap-4">
                    {flag && (
                      <span className="relative inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-white shadow-sm">
                        <Image
                          src={flag.src}
                          alt={flag.alt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                    )}

                    <p className="font-display text-5xl font-light leading-none text-ink-subtle md:text-6xl">
                      {office.code}
                    </p>
                  </div>

                  <h3 className="mt-6 font-display text-3xl font-normal text-ink md:text-4xl">
                    {office.city}
                  </h3>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {office.country}
                  </p>

                  <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                    {office.address}
                  </p>

                  <div className="mt-6 space-y-1.5 text-sm">
                    <a
                      href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                      dir="ltr"
                      className="block text-ink transition-colors hover:text-primary"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}