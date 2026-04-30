import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface AboutHeroProps {
  dict: Dictionary["about"]["hero"];
}

export function AboutHero({ dict }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface pb-20 pt-32 md:pt-40">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {dict.eyebrow}
          </p>
        </Reveal>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div>
            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[90px] lg:leading-[1.02]">
              <Reveal delay={150}>
                <span className="block">{dict.title}</span>
              </Reveal>
              <Reveal delay={300}>
                <span className="block text-primary">{dict.titleHighlight}</span>
              </Reveal>
            </h1>

            <Reveal delay={500}>
              <div className="mt-10 max-w-lg space-y-4 text-base leading-relaxed text-ink-muted md:text-lg">
                {dict.intro.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={700}>
              <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-subtle">
                <span className="inline-block h-px w-12 bg-ink-subtle" aria-hidden />
                {dict.scrollHint}
              </div>
            </Reveal>
          </div>

          {/* Right — Team Photo */}
          <Reveal delay={400} direction="left">
            <div className="relative">
              {/* Main photo */}
              <div className="relative overflow-hidden rounded-2xl shadow-card">
                <Image
                  src="/images/Stellar Consulting Team.jpeg"
                  alt="Stellar Consulting Team"
                  width={600}
                  height={450}
                  className="h-auto w-full object-cover"
                  priority
                />
                {/* Overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent px-6 py-6">
                  <p className="text-lg font-semibold text-white">Our Dedicated Team</p>
                  <p className="text-sm text-white/80">15+ Years Combined Experience</p>
                </div>
              </div>

              {/* Experience badge — floating circle */}
              <div className="absolute -end-4 -top-4 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 md:-end-6 md:-top-6 md:h-28 md:w-28">
                <span className="text-3xl font-bold leading-none md:text-4xl">15+</span>
                <span className="mt-1 text-center text-[10px] font-medium leading-tight md:text-xs">Years<br/>Experience</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}