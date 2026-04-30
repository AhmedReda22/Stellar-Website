"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper around next-themes so we can swap providers later without
 * touching layout files. Persists user preference to localStorage and syncs
 * with the OS preference on first load.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
  attribute="class"
  defaultTheme="light"
  enableSystem={false}
  disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
