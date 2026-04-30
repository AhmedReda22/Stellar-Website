import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

interface GallerySectionProps {
  locale: Locale;
  dict: Dictionary["home"]["gallery"];
}

export function GallerySection({ locale, dict }: GallerySectionProps) {
  return (
    <section className="bg-surface py-20 md:py-28" id="gallery">
      <div className="container">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.heading}
          subtitle={dict.subtitle}
          align="center"
        />

        <div className="mt-10">
          <GalleryGrid
            filters={dict.filters}
            limit={12}
            photoCountTemplate={dict.photoCount}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/gallery`}
            className="rounded-full border-2 border-primary px-7 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {dict.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
