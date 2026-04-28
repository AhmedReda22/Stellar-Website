import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { locales } from "@/lib/i18n/config";

/**
 * Generates entries for every (locale, route) pair, with language alternates
 * so search engines understand the EN/AR variants of each page.
 *
 * Phase 2: only routes that exist (homepage). Will be expanded as more pages
 * are converted in subsequent phases.
 */

const staticRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  // Routes below will become live as Phase 3+ converts them. They're listed
  // here as a checklist — uncomment as each page lands.
  // { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  // { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  // { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  // { path: "/partners", changeFrequency: "monthly", priority: 0.7 },
  // { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  // { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${siteConfig.url}/${l}${route.path}`;
      }

      entries.push({
        url: `${siteConfig.url}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
