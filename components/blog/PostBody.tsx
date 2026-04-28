interface PostBodyProps {
  /** HTML rendered from markdown (already sanitized at build) */
  contentHtml: string;
}

/**
 * Renders the markdown-converted HTML body of a blog post.
 *
 * Uses Tailwind's prose-like utility classes manually (no @tailwindcss/typography
 * plugin needed) — gives us tighter editorial control over headings, lists,
 * and paragraph rhythm.
 */
export function PostBody({ contentHtml }: PostBodyProps) {
  return (
    <article className="bg-surface py-12 md:py-20">
      <div className="container">
        <div
          className="
            mx-auto max-w-3xl
            text-base leading-relaxed text-ink md:text-lg
            [&>p]:my-6
            [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:font-display [&>h2]:text-3xl [&>h2]:font-normal [&>h2]:leading-tight md:[&>h2]:text-4xl
            [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:font-display [&>h3]:text-2xl [&>h3]:font-normal md:[&>h3]:text-3xl
            [&>h4]:mt-10 [&>h4]:mb-3 [&>h4]:text-xl [&>h4]:font-semibold
            [&>ul]:my-6 [&>ul]:space-y-2 [&>ul]:ps-6 [&>ul>li]:list-disc [&>ul>li]:marker:text-primary
            [&>ol]:my-6 [&>ol]:space-y-2 [&>ol]:ps-6 [&>ol>li]:list-decimal [&>ol>li]:marker:text-primary
            [&_strong]:font-semibold [&_strong]:text-ink
            [&_em]:italic
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline
            [&_blockquote]:my-8 [&_blockquote]:border-s-2 [&_blockquote]:border-primary [&_blockquote]:ps-6 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-ink-muted
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  );
}