import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface AboutHeroProps {
  dict: Dictionary["about"]["hero"];
}

/**
 * Editorial hero for the About page. Calm, confident, no carousel.
 *
 * Layout: small eyebrow → massive serif headline (two-line, second line in
 * primary accent) → narrow intro paragraph → subtle scroll hint at bottom.
 *
 * The headline uses the Fraunces variable serif at large display sizes —
 * this is the brand's "voice" moment. Everything else stays restrained so
 * the typography lands.
 */
export function AboutHero({ dict }: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-surface pb-20 pt-32 md:pt-40">
      {/* Top-corner eyebrow — small label, lots of whitespace */}
      <div className="container">
        <Reveal delay={0}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {dict.eyebrow}
          </p>
        </Reveal>

        {/* Display headline — two lines, second line in accent.
            Asymmetric: starts at column 1 on mobile, column 2 on desktop. */}
        <h1 className="mt-8 max-w-5xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[110px] lg:leading-[1.02]">
          <Reveal delay={150}>
            <span className="block">{dict.title}</span>
          </Reveal>
          <Reveal delay={300}>
            <span className="block text-primary">{dict.titleHighlight}</span>
          </Reveal>
        </h1>

        {/* Intro paragraph — narrow column, generous leading.
            Right-aligned start to create asymmetric balance with the headline. */}
        <Reveal delay={500}>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-ink-muted md:ms-auto md:text-xl">
            {dict.intro}
          </p>
        </Reveal>

        {/* Scroll hint — tiny, in the bottom corner. Not a button, just a label. */}
        <Reveal delay={700}>
          <div className="mt-20 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-subtle md:mt-32">
            <span className="inline-block h-px w-12 bg-ink-subtle" aria-hidden />
            {dict.scrollHint}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
