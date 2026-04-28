"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { MeetingModal } from "@/components/layout/MeetingModal";

interface RegionalReachProps {
  regional: Dictionary["about"]["regional"];
  cta: Dictionary["about"]["cta"];
  modal: Dictionary["modal"];
}

/**
 * Closing section for the About page. Two-part:
 *
 * 1. Regional reach — dark surface, oversized "8" stat as the visual anchor.
 *    Shows scale without a map (maps are visual noise + accessibility issues).
 *
 * 2. CTA — quiet, confident close. Headline + body + single button. The
 *    button opens the existing MeetingModal so we don't duplicate the form.
 *
 * Both share the same dark background to feel like one continuous moment —
 * the page exits on a strong, unified note.
 */
export function RegionalReach({ regional, cta, modal }: RegionalReachProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="bg-secondary text-white">
        {/* Regional reach — split layout: text on the start, giant numeral on end */}
        <div className="container py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Text column */}
            <div>
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
                <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                  {regional.body}
                </p>
              </Reveal>
            </div>

            {/* Giant numeral — the visual punch */}
            <Reveal delay={300} direction="left">
              <div className="text-center md:text-end">
                <span className="block font-display text-[180px] font-light leading-none text-primary md:text-[260px] lg:text-[320px]">
                  <AnimatedCounter end={Number(regional.stat)} />
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {regional.statLabel}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hairline separator between the two halves of the dark section */}
        <div className="container">
          <div className="border-t border-white/10" />
        </div>

        {/* Final CTA */}
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
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <MeetingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        dict={modal}
      />
    </>
  );
}
