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

  return {
    ...buildMetadata({
      locale,
      title: `${siteConfig.name} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      path: "",
    }),
    icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon.png", type: "image/png" },
  ],
  apple: "/favicon.png",
},
  };
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
          {/* WebMCP — expose site tools to AI agents via browser */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      if (typeof navigator !== 'undefined' && navigator.modelContext) {
        navigator.modelContext.provideContext({
          tools: [
            {
              name: "get_company_info",
              description: "Get information about Stellar Consulting MEA - a healthcare consultancy firm",
              inputSchema: { type: "object", properties: {} },
              execute: async function() {
                return {
                  name: "Stellar Consulting MEA",
                  type: "Healthcare Consultancy",
                  founded: "2009",
                  headquarters: "Dubai, UAE",
                  offices: ["Dubai, UAE", "Riyadh, KSA", "Cairo, Egypt"],
                  countries: 8,
                  partners: 31,
                  services: [
                    "Healthcare Advertising & Brand Engagement",
                    "Medical Affairs & Communication Solutions",
                    "Market Access & Payer Strategy",
                    "Health System Partnerships",
                    "Digital & Innovative Solutions"
                  ],
                  website: "https://stellarmea.com",
                  email: "hello@stellarconsulting.com"
                };
              }
            },
            {
              name: "get_services",
              description: "List all healthcare consulting services offered by Stellar Consulting",
              inputSchema: { type: "object", properties: {} },
              execute: async function() {
                return [
                  { name: "Healthcare Advertising & Brand Engagement", slug: "healthcare-advertising", description: "Creative campaigns for regulated healthcare audiences" },
                  { name: "Medical Affairs & Communication Solutions", slug: "medical-affairs", description: "Bridging clinical evidence with practical communication" },
                  { name: "Market Access & Payer Strategy", slug: "market-access", description: "Evidence-based access strategies for MEA markets" },
                  { name: "Health System Partnerships", slug: "health-system-partnerships", description: "Sustainable collaborations with health systems" },
                  { name: "Digital & Innovative Solutions", slug: "technology-services", description: "Interactive platforms and digital tools" }
                ];
              }
            },
            {
              name: "get_contact_info",
              description: "Get contact information for Stellar Consulting offices",
              inputSchema: { type: "object", properties: {} },
              execute: async function() {
                return {
                  offices: [
                    { city: "Dubai", country: "UAE", phone: "+971-52-1159-551", email: "uae@stellarconsulting.com" },
                    { city: "Riyadh", country: "KSA", phone: "+966-5-0009-7842", email: "ksa@stellarconsulting.com" },
                    { city: "Cairo", country: "Egypt", phone: "+20-010-0644-3139", email: "egypt@stellarconsulting.com" }
                  ],
                  general: "hello@stellarconsulting.com",
                  website: "https://stellarmea.com"
                };
              }
            },
            {
              name: "schedule_meeting",
              description: "Navigate to the contact page to schedule a meeting with Stellar Consulting",
              inputSchema: {
                type: "object",
                properties: {
                  service: { type: "string", description: "The service of interest" }
                }
              },
              execute: async function(input) {
                window.location.href = "/en/contact";
                return { status: "redirecting", destination: "/en/contact" };
              }
            }
          ]
        });
      }
    `,
  }}
/>
        </ThemeProvider>
      </body>
    </html>
  );
}
