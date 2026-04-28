import Script from "next/script";

import { type Locale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import { getAllPosts, getAllCategories } from "@/lib/content/blog";

import { BlogHero } from "@/components/blog/BlogHero";
import { BlogList } from "@/components/blog/BlogList";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${dict.nav.blogs} — ${dict.meta.siteName}`,
    description: dict.blogPage.intro,
    path: "/blogs",
  });
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const posts = getAllPosts(locale);
  const categories = getAllCategories(locale);

  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dict.nav.blogs, url: `${siteConfig.url}/${locale}/blogs` },
  ]);

  // Blog schema for AI agents + search engines
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} — ${dict.nav.blogs}`,
    description: dict.blogPage.intro,
    url: `${siteConfig.url}/${locale}/blogs`,
    inLanguage: locale,
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${siteConfig.url}/${locale}/blogs/${p.slug}`,
      datePublished: p.publishedAt,
      image: `${siteConfig.url}${p.cover}`,
    })),
  };

  return (
    <>
      <Script
        id="ld-breadcrumb-blogs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <BlogHero hero={dict.blogPage.hero} intro={dict.blogPage.intro} />
      <BlogList
        locale={locale}
        posts={posts}
        categories={categories}
        allLabel={dict.blogPage.filters.all}
        noResultsLabel={dict.blogPage.noResults}
        minReadLabel={dict.blogPage.minRead}
      />
    </>
  );
}