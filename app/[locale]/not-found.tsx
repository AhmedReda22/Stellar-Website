import Link from "next/link";

/**
 * Locale-agnostic 404. Rendered when notFound() is called from a [locale]
 * route OR when a route inside a locale segment doesn't match.
 *
 * We can't easily get the current locale here (Next 15 limitation in
 * not-found.tsx), so we link back to the localized root using a script-free
 * approach: the navbar already includes a back-to-home affordance via the logo.
 */
export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        ← Back home
      </Link>
    </div>
  );
}
