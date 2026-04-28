import { siteConfig } from "./site-config";

/**
 * Centralized JSON-LD schema builders. These are injected into pages via a
 * <Script type="application/ld+json"> tag and help search engines + AI agents
 * understand the structure of the site.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.social),
    address: siteConfig.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressCountry: office.country,
    })),
    contactPoint: siteConfig.offices.map((office) => ({
      "@type": "ContactPoint",
      telephone: office.phone,
      areaServed: office.country,
      contactType: "customer service",
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: ["en", "ar"],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    location: siteConfig.offices.map((office) => ({
      "@type": "Place",
      name: `${siteConfig.name} — ${office.country}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressLocality: office.city,
        addressCountry: office.country,
      },
      telephone: office.phone,
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
