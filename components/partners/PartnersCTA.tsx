"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";
import { MeetingModal } from "@/components/layout/MeetingModal";

interface PartnersCTAProps {
  cta: Dictionary["partnersPage"]["cta"];
  modal: Dictionary["modal"];
}

export function PartnersCTA({ cta, modal }: PartnersCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-surface py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-light leading-tight text-ink md:text-5xl lg:text-6xl">
                {cta.heading}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
                {cta.body}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <button
                type="button"
                onClick={() => setOpen(true)}
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

      <MeetingModal open={open} onClose={() => setOpen(false)} dict={modal} />
    </>
  );
}