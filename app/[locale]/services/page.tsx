import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";

import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServicesList } from "@/components/services/ServicesList";
import { Process } from "@/components/services/Process";
import { ServicesCTA } from "@/components/services/ServicesCTA";

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
    title: `${dict.nav.services} — ${dict.meta.siteName}`,
    description: dict.servicesPage.hero.intro,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.services, url: `${siteConfig.url}/${locale}/services` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.nav.services,
    description: dict.servicesPage.hero.intro,
    numberOfItems: dict.servicesPage.services.length,
    itemListElement: dict.servicesPage.services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: `${siteConfig.url}/${locale}/services/${service.slug}`,
        provider: { "@type": "Organization", name: siteConfig.name },
      },
    })),
  };

  return (
    <>
      <Script id="ld-breadcrumb-services" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Script id="ld-itemlist-services" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <ServicesHero dict={dict.servicesPage.hero} />
      <ServicesIntro dict={dict.servicesPage.intro} />
      <ServicesList
        locale={locale}
        services={dict.servicesPage.services}
        filters={dict.servicesPage.filters}
        viewServiceLabel={dict.servicesPage.viewService}
      />
      <Process dict={dict.servicesPage.process} />
      <ServicesCTA cta={dict.servicesPage.cta} modal={dict.modal} />
    </>
  );
}