import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

interface GalleryFullProps {
  /** Use the home dict's gallery filters/photoCount labels for consistency */
  filters: Dictionary["home"]["gallery"]["filters"];
  photoCountTemplate: string;
}

/**
 * Full gallery section — wraps the existing GalleryGrid component with
 * NO limit (the home page caps it at 9; here we show all items).
 *
 * Reuses the same labels from the home dict to keep filter wording
 * consistent across pages.
 */
export function GalleryFull({ filters, photoCountTemplate }: GalleryFullProps) {
  return (
    <section className="bg-surface pb-24 md:pb-32">
      <div className="container">
        <GalleryGrid
          filters={filters}
          photoCountTemplate={photoCountTemplate}
          showFilters
        />
      </div>
    </section>
  );
}