import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";

const SITE_MARKDOWN = `# Stellar Consulting MEA

## Healthcare Consultancy Agency

Stellar is a 360 healthcare consultancy firm providing integrated solutions across healthcare advertising, scientific communication, market access, and healthcare partnerships.

For 15 years, we have been committed to delivering premium quality and innovative solutions that exceed our customers' expectations.

### Services

1. **Healthcare Advertising & Brand Engagement** - Creative campaigns for regulated healthcare audiences
2. **Medical Affairs & Communication Solutions** - Bridging clinical evidence with practical communication
3. **Market Access & Payer Strategy** - Evidence-based access strategies for MEA markets
4. **Health System Partnerships** - Sustainable collaborations with health systems
5. **Digital & Innovative Solutions** - Interactive platforms and digital tools

### Regional Presence

Operating in 8 countries: UAE, Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, Lebanon, Jordan

### Offices

- **Dubai, UAE**: Building A2, FZA Business Park, Dubai Silicon Oasis | +971-52-1159-551
- **Riyadh, KSA**: 7306 King Fahd Road, Alwsham | +966-5-0009-7842
- **Cairo, Egypt**: Villa 4, ElBanafseg 1, New Cairo | +20-010-0644-3139

### Contact

- Website: https://stellarmea.com
- Email: hello@stellarconsulting.com

### Partners

31+ active partners including AstraZeneca, Novartis, Pfizer, Roche, Takeda, Sanofi, Eli Lilly, and more.
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Markdown for Agents ---
  // If any page is requested with Accept: text/markdown, return markdown
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/markdown")) {
    const tokens = SITE_MARKDOWN.split(/\s+/).length;
    return new NextResponse(SITE_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(tokens),
      },
    });
  }

  // --- Skip internal paths ---
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    pathname.includes(".") // static files (images, favicon, etc.)
  ) {
    return NextResponse.next();
  }

  // --- Locale detection ---
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale | undefined;

  // Already has a valid locale prefix → proceed
  if (firstSegment && locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Detect preferred locale from cookie or Accept-Language
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  let detectedLocale: Locale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
    const acceptLang = request.headers.get("accept-language") || "";
    for (const locale of locales) {
      if (acceptLang.includes(locale)) {
        detectedLocale = locale;
        break;
      }
    }
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};