import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  href: string;
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
}

export function ServiceCard({
  href,
  title,
  description,
  iconSrc,
  iconAlt,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
    >
      {/* Animated brand strip */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-light transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {description}
      </p>

      {/* "Learn more" pinned to bottom — mt-auto pushes it down regardless of content height */}
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
        Learn more
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}