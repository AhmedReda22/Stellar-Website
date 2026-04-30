import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import { galleryItems } from "@/lib/content/gallery";

import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryHomeStats } from "@/components/gallery/GalleryHomeStats";
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
    description: dict.meta.description,
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

  const galleryListSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} — ${dict.nav.gallery}`,
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
      <Script id="ld-breadcrumb-gallery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Script id="ld-gallery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryListSchema) }} />

      <GalleryHero dict={dict.galleryPage.hero} />
      <GalleryHomeStats />
      <GalleryFull
        filters={dict.home.gallery.filters}
        photoCountTemplate={dict.home.gallery.photoCount}
      />
      <GalleryCTA cta={dict.galleryPage.cta} modal={dict.modal} />
    </>
  );
}