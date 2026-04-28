import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface ContactHeroProps {
  dict: Dictionary["contact"]["hero"];
}

/**
 * Contact page opener. Same anatomy as the About hero for visual consistency:
 * eyebrow → display serif headline (two lines, second in accent) → narrow
 * intro paragraph. Slightly shorter than About's hero since the form below
 * is the real content.
 */
export function ContactHero({ dict }: ContactHeroProps) {
  return (
    <section className="bg-surface pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {dict.eyebrow}
          </p>
        </Reveal>

        <h1 className="mt-8 max-w-4xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[100px] lg:leading-[1.02]">
          <Reveal delay={150}>
            <span className="block">{dict.title}</span>
          </Reveal>
          <Reveal delay={300}>
            <span className="block text-primary">{dict.titleHighlight}</span>
          </Reveal>
        </h1>

        <Reveal delay={500}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {dict.intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}