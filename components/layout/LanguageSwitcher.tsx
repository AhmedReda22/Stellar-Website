"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  label: string;
  className?: string;
}

/**
 * Replaces the locale segment in the current URL and writes the user's choice
 * to NEXT_LOCALE cookie so future visits go to the same locale (read by
 * middleware.ts).
 */
export function LanguageSwitcher({
  currentLocale,
  label,
  className,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === currentLocale) return;

    // Persist preference (1 year)
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Swap the leading /xx/ segment
    const segments = pathname.split("/");
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || `/${next}`);
    router.refresh();
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated p-1 text-xs font-semibold",
        className,
      )}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-pressed={locale === currentLocale}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            locale === currentLocale
              ? "bg-primary text-white shadow-sm"
              : "text-ink-muted hover:text-primary",
          )}
        >
          {locale === "ar" ? "ع" : locale.toUpperCase()}
          <span className="sr-only">{localeNames[locale]}</span>
        </button>
      ))}
    </div>
  );
}
