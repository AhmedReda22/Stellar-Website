import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import { galleryItems } from "@/lib/content/gallery";

import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryIntro } from "@/components/gallery/GalleryIntro";
import { GalleryStats } from "@/components/gallery/GalleryStats";
import { GalleryFull } from "@/components/gallery/GalleryFull";
import { GalleryCTA } from "@/components/gallery/GalleryCTA";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${dict.nav.gallery} — ${dict.meta.siteName}`,
    description: dict.galleryPage.intro.body,
    path: "/gallery",
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.gallery, url: `${siteConfig.url}/${locale}/gallery` },
  ]);

  // ImageGallery schema for SEO + AI agents
  const galleryListSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} — ${dict.nav.gallery}`,
    description: dict.galleryPage.intro.body,
    numberOfItems: galleryItems.length,
    associatedMedia: galleryItems.map((item) => ({
      "@type": "ImageObject",
      name: item.title,
      contentUrl: `${siteConfig.url}${item.cover}`,
      caption: item.location,
    })),
  };

  return (
    <>
      <Script
        id="ld-breadcrumb-gallery"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-gallery"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryListSchema) }}
      />

      <GalleryHero dict={dict.galleryPage.hero} />
      <GalleryIntro dict={dict.galleryPage.intro} />
      <GalleryStats stats={dict.galleryPage.stats} />
      <GalleryFull
        filters={dict.home.gallery.filters}
        photoCountTemplate={dict.home.gallery.photoCount}
      />
      <GalleryCTA cta={dict.galleryPage.cta} modal={dict.modal} />
    </>
  );
}