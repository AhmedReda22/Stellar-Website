import type { ReactNode } from "react";
import { Poppins, Cairo, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

import "../globals.css";

import { locales, getDirection, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/seo/site-config";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

// ---------------------------------------------------------------------------
// Fonts (loaded by next/font for zero CLS and self-hosted delivery)
// ---------------------------------------------------------------------------
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

// Editorial display serif — used for hero headlines and section openers.
// Variable font: includes optical sizing + soft axis for character.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

// ---------------------------------------------------------------------------
// Static params — pre-render every supported locale at build time
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Per-locale metadata for the root segment
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
// Layout
// ---------------------------------------------------------------------------
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Reject any locale that isn't in our supported list
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dir = getDirection(typedLocale);
  const dict = await getDictionary(typedLocale);

  return (
    <html
      lang={typedLocale}
      dir={dir}
      className={`${poppins.variable} ${cairo.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface text-ink antialiased" suppressHydrationWarning>
        {/* JSON-LD: site-wide structured data for search engines + AI agents */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />

        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>

          <Navbar locale={typedLocale} dict={dict} />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer locale={typedLocale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
