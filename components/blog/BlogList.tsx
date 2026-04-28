"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/content/blog";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface BlogListProps {
  locale: Locale;
  posts: BlogPost[];
  categories: string[];
  allLabel: string;
  noResultsLabel: string;
  minReadLabel: string;
}

/**
 * Editorial blog listing with category filter.
 *
 * First post (newest) renders as a large "featured" card with cover image
 * spanning two columns. Remaining posts render in a 3-column grid below.
 *
 * Filter pills sit at the top. When a filter is active and the featured
 * post doesn't match, all visible posts render in the standard grid.
 */
export function BlogList({
  locale,
  posts,
  categories,
  allLabel,
  noResultsLabel,
  minReadLabel,
}: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visiblePosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const showFeatured = activeCategory === "all" && visiblePosts.length > 0;
  const featured = showFeatured ? visiblePosts[0] : null;
  const rest = showFeatured ? visiblePosts.slice(1) : visiblePosts;

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        {/* Filter pills */}
        <div role="tablist" aria-label="Filter articles" className="flex flex-wrap gap-2">
          <FilterPill
            label={allLabel}
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* No results */}
        {visiblePosts.length === 0 && (
          <Reveal>
            <p className="mt-16 text-center text-base text-ink-muted">
              {noResultsLabel}
            </p>
          </Reveal>
        )}

        {/* Featured post — large card spanning full width */}
        {featured && (
          <div className="mt-12 md:mt-16">
            <Reveal>
              <Link
                href={`/${locale}/blogs/${featured.slug}`}
                className="group grid gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-muted">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ink transition-colors group-hover:text-primary md:text-4xl lg:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
                    {featured.description}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-wider text-ink-subtle">
                    {formatDate(featured.publishedAt, locale)} · {featured.readingTime} {minReadLabel}
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        )}

        {/* Rest in 3-col grid */}
        {rest.length > 0 && (
          <ul
            className={cn(
              "grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3",
              showFeatured ? "mt-20 border-t border-border pt-16" : "mt-12 md:mt-16",
            )}
          >
            {rest.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={Math.min((i % 3) * 80, 240)}>
                  <Link
                    href={`/${locale}/blogs/${post.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-video overflow-hidden bg-surface-muted">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {post.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-normal leading-snug text-ink transition-colors group-hover:text-primary md:text-2xl">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                        {post.description}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-wider text-ink-subtle">
                        {formatDate(post.publishedAt, locale)} · {post.readingTime} {minReadLabel}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-transparent text-ink-muted hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}

function formatDate(iso: string, locale: Locale) {
  try {
    return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}