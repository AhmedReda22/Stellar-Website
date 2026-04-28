import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/content/blog";
import { Reveal } from "@/components/shared/Reveal";

interface PostHeaderProps {
  locale: Locale;
  post: BlogPost;
  backLabel: string;
  publishedOnLabel: string;
  minReadLabel: string;
}

export function PostHeader({ locale, post, backLabel, publishedOnLabel, minReadLabel }: PostHeaderProps) {
  const formattedDate = (() => {
    try {
      return new Date(post.publishedAt).toLocaleDateString(
        locale === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      );
    } catch {
      return post.publishedAt;
    }
  })();

  return (
    <header className="bg-surface pb-12 pt-32 md:pb-16 md:pt-40">
      <div className="container">
        <Reveal>
          <Link
            href={`/${locale}/blogs`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-primary"
          >
            <svg className="h-3 w-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {post.category}
          </p>
        </Reveal>

        <h1 className="mt-6 max-w-5xl font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-6xl lg:text-7xl">
          <Reveal delay={200}>
            <span>{post.title}</span>
          </Reveal>
        </h1>

        <Reveal delay={400}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {post.description}
          </p>
        </Reveal>

        <Reveal delay={500}>
          <p className="mt-8 text-xs uppercase tracking-wider text-ink-subtle">
            {publishedOnLabel} {formattedDate} · {post.readingTime} {minReadLabel}
          </p>
        </Reveal>
      </div>

      {/* Cover image — full bleed below header text */}
      <Reveal delay={600}>
        <div className="container mt-12 md:mt-16">
          <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width:1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </header>
  );
}