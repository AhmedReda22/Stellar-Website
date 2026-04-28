import data from "./gallery.json";

export type GalleryCategory = "events" | "booth" | "training" | "digital";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  location: string;
  photoCount: number;
  cover: string;
  images: string[];
}

export const galleryItems: GalleryItem[] = data as GalleryItem[];
