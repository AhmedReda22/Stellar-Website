import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import { partners } from "@/lib/content/partners";

import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersIntro } from "@/components/partners/PartnersIntro";
import { PartnersGrid } from "@/components/partners/PartnersGrid";
import { PartnersStats } from "@/components/partners/PartnersStats";
import { PartnersCTA } from "@/components/partners/PartnersCTA";

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
    title: `${dict.nav.partners} — ${dict.meta.siteName}`,
    description: dict.partnersPage.intro.body,
    path: "/partners",
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.partners, url: `${siteConfig.url}/${locale}/partners` },
  ]);

  // ItemList of partner organizations for SEO + AI agents
  const partnersListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} — ${dict.nav.partners}`,
    numberOfItems: partners.length,
    itemListElement: partners.map((partner, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Organization",
        name: partner.name,
      },
    })),
  };

  return (
    <>
      <Script
        id="ld-breadcrumb-partners"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-partners-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersListSchema) }}
      />

      <PartnersHero dict={dict.partnersPage.hero} />
      <PartnersIntro dict={dict.partnersPage.intro} />
      <PartnersGrid
        filters={dict.partnersPage.filters}
        categoryDescriptions={dict.partnersPage.categoryDescriptions}
      />
      <PartnersStats dict={dict.partnersPage.stats} />
      <PartnersCTA cta={dict.partnersPage.cta} modal={dict.modal} />
    </>
  );
}