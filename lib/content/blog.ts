import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

import type { Locale } from "@/lib/i18n/config";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  cover: string;
  publishedAt: string;
  category: string;
  readingTime: number;
  /** HTML rendered from markdown — only set when fetching full post */
  contentHtml?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blogs");

/**
 * Read all blog posts for a given locale, sorted newest first.
 * Used by the /blogs listing page.
 */
export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      description: data.description as string,
      cover: data.cover as string,
      publishedAt: data.publishedAt as string,
      category: data.category as string,
      readingTime: (data.readingTime as number) || 3,
    };
  });

  // Newest first
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Read a single post by slug, with fully-rendered HTML body.
 * Used by /blogs/[slug] page.
 */
export async function getPostBySlug(
  locale: Locale,
  slug: string,
): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    slug: data.slug as string,
    title: data.title as string,
    description: data.description as string,
    cover: data.cover as string,
    publishedAt: data.publishedAt as string,
    category: data.category as string,
    readingTime: (data.readingTime as number) || 3,
    contentHtml: processed.toString(),
  };
}

/**
 * Returns up to N other posts, preferring same-category, then newest.
 */
export function getRelatedPosts(
  locale: Locale,
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  const all = getAllPosts(locale).filter((p) => p.slug !== currentSlug);
  const sameCategory = all.filter((p) => p.category === category);
  const others = all.filter((p) => p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Returns all unique categories across posts in this locale.
 */
export function getAllCategories(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const set = new Set<string>();
  for (const p of posts) set.add(p.category);
  return Array.from(set);
}