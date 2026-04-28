import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";

import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Locations } from "@/components/contact/Locations";

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
    title: `${dict.nav.contact} — ${dict.meta.siteName}`,
    description: dict.contact.hero.intro,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.contact, url: `${siteConfig.url}/${locale}/contact` },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: dict.nav.contact,
    url: `${siteConfig.url}/${locale}/contact`,
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      contactPoint: dict.contact.locations.offices.map((office) => ({
        "@type": "ContactPoint",
        telephone: office.phone,
        email: office.email,
        areaServed: office.country,
        contactType: "customer service",
      })),
    },
  };

  return (
    <>
      <Script
        id="ld-breadcrumb-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-contactpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <ContactHero dict={dict.contact.hero} />
      <ContactForm form={dict.contact.form} channels={dict.contact.channels} />
      <Locations dict={dict.contact.locations} />
    </>
  );
}