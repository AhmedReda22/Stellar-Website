import { notFound } from "next/navigation";
import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";

import { ServiceDetailHero } from "@/components/services/ServiceDetailHero";
import { ServiceOverview } from "@/components/services/ServiceOverview";
import { ServiceCapabilities } from "@/components/services/ServiceCapabilities";
import { ServiceApproach } from "@/components/services/ServiceApproach";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceDetailCTA } from "@/components/services/ServiceDetailCTA";

const validSlugs = [
  "healthcare-advertising",
  "medical-affairs",
  "market-access",
  "health-system-partnerships",
  "technology-services",
] as const;

type Slug = (typeof validSlugs)[number];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    validSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug as Slug)) return {};

  const dict = await getDictionary(locale);
  const service = dict.servicesPage.services.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    locale,
    title: `${service.title} — ${dict.meta.siteName}`,
    description: service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug as Slug)) notFound();

  const dict = await getDictionary(locale);
  const service = dict.servicesPage.services.find((s) => s.slug === slug);
  const detail = (dict.serviceDetails.items as Record<string, {
    overview: string;
    approach: { title: string; body: string }[];
    stats: { projects: string; clients: string; countries: string };
    related: string[];
  }>)[slug];

  if (!service || !detail) notFound();

  // Get related services from the data
  const relatedServices = detail.related
    .map((relatedSlug) => dict.servicesPage.services.find((s) => s.slug === relatedSlug))
    .filter((s): s is typeof service => Boolean(s));

  // Resolve translated category label
  const categoryLabel =
    (dict.servicesPage.filters as Record<string, string>)[service.category] ??
    service.category;

  // Breadcrumb
  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.services, url: `${siteConfig.url}/${locale}/services` },
    { name: service.title, url: `${siteConfig.url}/${locale}/services/${slug}` },
  ]);

  // Service schema for SEO + AI agents
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: detail.overview,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["United Arab Emirates", "Saudi Arabia", "Egypt", "Middle East", "North Africa"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.deliverables.map((d, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };

  return (
    <>
      <Script
        id={`ld-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id={`ld-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <ServiceDetailHero
        locale={locale}
        service={service}
        category={categoryLabel}
        backLabel={dict.serviceDetails.back}
      />

      <ServiceOverview
        overviewLabel={dict.serviceDetails.overviewLabel}
        overview={detail.overview}
        stats={detail.stats}
        statLabels={dict.serviceDetails.stats}
      />

      <ServiceCapabilities
        label={dict.serviceDetails.capabilitiesLabel}
        deliverables={service.deliverables}
      />

      <ServiceApproach
        label={dict.serviceDetails.approachLabel}
        items={detail.approach}
      />

      {relatedServices.length > 0 && (
        <RelatedServices
          locale={locale}
          label={dict.serviceDetails.relatedLabel}
          services={relatedServices}
          categoryLabels={dict.servicesPage.filters}
        />
      )}

      <ServiceDetailCTA
        heading={dict.serviceDetails.ctaHeading}
        buttonLabel={dict.serviceDetails.ctaButton}
        modal={dict.modal}
      />
    </>
  );
}