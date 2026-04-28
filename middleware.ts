import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

/**
 * Redirects requests like /about → /en/about based on Accept-Language header,
 * with a fallback to the default locale.
 *
 * Skips static assets, _next internals, and API routes.
 */

function getLocaleFromRequest(request: NextRequest): string {
  // 1. Cookie wins (set by LanguageSwitcher when the user explicitly chooses)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale;
  }

  // 2. Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    // Parse "ar-EG,ar;q=0.9,en;q=0.8" → first matching locale
    const preferred = acceptLang
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase())
      .map((tag) => tag.split("-")[0]);

    for (const tag of preferred) {
      if (locales.includes(tag as (typeof locales)[number])) {
        return tag;
      }
    }
  }

  // 3. Fall back
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already prefixed with a locale? Let it through.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Otherwise, redirect to the appropriate locale prefix.
  const locale = getLocaleFromRequest(request);
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Skip Next internals, API routes, files with extensions (favicon.ico, robots.txt, sitemap.xml, images),
  // and the special metadata files we want to handle directly.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
