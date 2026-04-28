import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
  divider?: boolean;
}

/**
 * Used across home sections to keep heading typography consistent.
 * The "highlight" word renders in brand pink — matches the original
 * <h2>OUR <span>SERVICES</span></h2> pattern.
 */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  divider = false,
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div className={cn("flex flex-col gap-3", alignment, className)}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold uppercase tracking-tight text-ink md:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h2>
      {divider && (
        <div className="flex items-center gap-3 py-2">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <span className="text-primary" aria-hidden>
            ✧
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>
      )}
      {subtitle && (
        <p className="max-w-2xl text-sm font-medium uppercase tracking-wider text-ink-muted md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
