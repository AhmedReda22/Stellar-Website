import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Reveal } from "@/components/shared/Reveal";

interface GalleryHeroProps {
  dict: Dictionary["galleryPage"]["hero"];
}

export function GalleryHero({ dict }: GalleryHeroProps) {
  return (
    <section className="bg-surface pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {dict.eyebrow}
          </p>
        </Reveal>

        <h1 className="mt-8 max-w-5xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[110px] lg:leading-[1.02]">
          <Reveal delay={150}>
            <span className="block">{dict.title}</span>
          </Reveal>
          <Reveal delay={300}>
            <span className="block text-primary">{dict.titleHighlight}</span>
          </Reveal>
        </h1>
      </div>
    </section>
  );
}