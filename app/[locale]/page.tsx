import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";

import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ContactSection } from "@/components/home/ContactSection";

// ---------------------------------------------------------------------------
// Static params — pre-render homepage for every supported locale
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Page-level metadata (overrides root layout for the homepage specifically)
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${siteConfig.name} — ${dict.meta.tagline}`,
    description: dict.meta.description,
    path: "",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Page-specific structured data — LocalBusiness + breadcrumbs.
  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
  ]);

  return (
    <>
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <Script
        id="ld-breadcrumb-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <HeroSlider locale={locale} dict={dict.home.hero} />
      <AboutSection locale={locale} dict={dict.home.about} />
      <ServicesSection locale={locale} dict={dict.home.servicesSection} />
      <TestimonialsSection locale={locale} dict={dict.home.testimonials} />
      <PartnersSection locale={locale} dict={dict.home.partners} />
      <GallerySection locale={locale} dict={dict.home.gallery} />
      <ContactSection dict={dict.home.contact} />
    </>
  );
}
