import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { locales, type Locale } from "@/lib/i18n/config";

interface BuildMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
}

/**
 * Builds Next.js Metadata with proper canonical, hreflang alternates,
 * Open Graph, and Twitter card tags.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  image = siteConfig.ogImage,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;

  // hreflang map for every supported locale + x-default
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${siteConfig.url}/${l}${path}`;
  }
  languages["x-default"] = `${siteConfig.url}/${locales[0]}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
