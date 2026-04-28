import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/content/blog";
import { Reveal } from "@/components/shared/Reveal";

interface RelatedPostsProps {
  locale: Locale;
  posts: BlogPost[];
  heading: string;
  minReadLabel: string;
}

export function RelatedPosts({ locale, posts, heading, minReadLabel }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface-muted py-20 md:py-28">
      <div className="container">
        <Reveal>
          <h2 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:mt-16 md:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(i * 100, 200)}>
                <Link href={`/${locale}/blogs/${post.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden bg-surface-muted">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
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
                    <p className="mt-4 text-xs uppercase tracking-wider text-ink-subtle">
                      {post.readingTime} {minReadLabel}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}