// Single source of truth for supported locales.
// Add a new locale here, drop a JSON dictionary in /messages, and you're done.
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtl(locale) ? "rtl" : "ltr";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};
