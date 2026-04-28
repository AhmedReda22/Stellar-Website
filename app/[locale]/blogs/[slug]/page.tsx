import { notFound } from "next/navigation";
import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/content/blog";

import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

export function generateStaticParams() {
  // Pre-render every (locale, slug) at build time
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  return buildMetadata({
    locale,
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    path: `/blogs/${slug}`,
    image: post.cover,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const related = getRelatedPosts(locale, slug, post.category, 3);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.blogs, url: `${siteConfig.url}/${locale}/blogs` },
    { name: post.title, url: `${siteConfig.url}/${locale}/blogs/${slug}` },
  ]);

  // BlogPosting schema for SEO + AI agents
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.publishedAt,
    inLanguage: locale,
    articleSection: post.category,
    url: `${siteConfig.url}/${locale}/blogs/${slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.logo}` },
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <Script
        id={`ld-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id={`ld-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PostHeader
        locale={locale}
        post={post}
        backLabel={dict.blogPage.back}
        publishedOnLabel={dict.blogPage.publishedOn}
        minReadLabel={dict.blogPage.minRead}
      />

      <PostBody contentHtml={post.contentHtml ?? ""} />

      <RelatedPosts
        locale={locale}
        posts={related}
        heading={dict.blogPage.relatedHeading}
        minReadLabel={dict.blogPage.minRead}
      />
    </>
  );
}