"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";
import { MeetingModal } from "@/components/layout/MeetingModal";

interface RegionalReachProps {
  regional: Dictionary["about"]["regional"];
  cta: Dictionary["about"]["cta"];
  modal: Dictionary["modal"];
}

// 8 countries with their approximate positions on a world map SVG (percentage-based)
const countries = [
  { name: "UAE", x: 63.5, y: 51, delay: 0 },
  { name: "Saudi Arabia", x: 59.5, y: 50, delay: 0.2 },
  { name: "Egypt", x: 56, y: 52, delay: 0.4 },
  { name: "Kuwait", x: 61, y: 45, delay: 0.6 },
  { name: "Qatar", x: 62.5, y: 48, delay: 0.8 },
  { name: "Turkey", x: 56.5, y: 39, delay: 1.0 },
  { name: "Lebanon", x: 58, y: 43, delay: 1.2 },
  { name: "Jordan", x: 57.5, y: 45, delay: 1.4 },
];

export function RegionalReach({ regional, cta, modal }: RegionalReachProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  return (
    <>
      <section className="bg-secondary text-white">
        <div className="container py-24 md:py-32">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {regional.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                {regional.heading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                {regional.body}
              </p>
            </Reveal>
          </div>

          {/* Interactive Map */}
          <Reveal delay={400}>
            <div className="mx-auto mt-16 max-w-4xl md:mt-20">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 shadow-lg backdrop-blur-sm md:p-10">
                {/* World map SVG background */}
                <div className="relative aspect-[2/1]">
                  <img
                    src="/images/map.png"
                    alt="World Map"
                    className="h-full w-full object-contain opacity-30 grayscale invert"
                  />

                  {/* Country markers */}
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      className="absolute"
                      style={{
                        left: `${country.x}%`,
                        top: `${country.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onMouseEnter={() => setActiveCountry(country.name)}
                      onMouseLeave={() => setActiveCountry(null)}
                    >
                      {/* Ripple animation */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30"
                        style={{
                          width: "30px",
                          height: "30px",
                          animationDelay: `${country.delay}s`,
                          animationDuration: "3s",
                        }}
                      />

                      {/* Outer glow */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20"
                        style={{ width: "24px", height: "24px" }}
                      />

                      {/* Marker dot */}
                      <button
                        type="button"
                        aria-label={country.name}
                        className="relative z-10 h-3 w-3 cursor-pointer rounded-full border-2 border-white bg-primary shadow-lg shadow-primary/50 transition-all duration-300 hover:scale-150 hover:bg-white hover:shadow-white/30 md:h-3.5 md:w-3.5"
                      />

                      {/* Label tooltip */}
                      <div
                        className="pointer-events-none absolute left-full top-1/2 z-20 ms-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg transition-all duration-300"
                        style={{
                          opacity: activeCountry === country.name ? 1 : 0,
                          transform: activeCountry === country.name
                            ? "translateX(0) translateY(-50%)"
                            : "translateX(-8px) translateY(-50%)",
                        }}
                      >
                        {country.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Active presence
                  </span>
                  <span>{countries.length} countries across MEA</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Separator */}
        <div className="container">
          <div className="border-t border-white/10" />
        </div>

        {/* CTA */}
        <div className="container py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                {cta.heading}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                {cta.body}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
              >
                {cta.button}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <MeetingModal open={modalOpen} onClose={() => setModalOpen(false)} dict={modal} />
    </>
  );
}