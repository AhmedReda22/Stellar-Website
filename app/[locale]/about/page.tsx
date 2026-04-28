import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";

import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyStellar } from "@/components/about/WhyStellar";
import { Values } from "@/components/about/Values";
import { Team } from "@/components/about/Team";
import { RegionalReach } from "@/components/about/RegionalReach";

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
    title: `${dict.nav.whoWeAre} — ${dict.meta.siteName}`,
    description: dict.about.hero.intro,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Breadcrumb structured data — helps search engines + AI agents understand
  // the page's place in the site.
  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.whoWeAre, url: `${siteConfig.url}/${locale}/about` },
  ]);

  return (
    <>
      <Script
        id="ld-breadcrumb-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <AboutHero dict={dict.about.hero} />
      <MissionVision mission={dict.about.mission} vision={dict.about.vision} />
      <WhyStellar dict={dict.about.why} />
      <Values dict={dict.about.values} />
      <Team dict={dict.about.team} />
      <RegionalReach
        regional={dict.about.regional}
        cta={dict.about.cta}
        modal={dict.modal}
      />
    </>
  );
}
