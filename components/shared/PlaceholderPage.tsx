import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  homeHref: string;
  homeLabel: string;
}

/**
 * Temporary placeholder used for routes that exist in the navigation but
 * haven't been converted yet (Phase 3+). Keeps internal links from 404'ing
 * during incremental migration.
 */
export function PlaceholderPage({ title, homeHref, homeLabel }: PlaceholderPageProps) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
        Coming soon
      </span>
      <h1 className="mt-5 text-3xl font-bold text-ink md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        This page is being migrated. Check back shortly — or head back to the homepage.
      </p>
      <Link
        href={homeHref}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        ← {homeLabel}
      </Link>
    </div>
  );
}
