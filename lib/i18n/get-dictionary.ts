import "server-only";
import type { Locale } from "./config";

// Lazy-import dictionaries so each locale lives in its own bundle.
// Server components await getDictionary(locale) once and pass slices down as props.
const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  ar: () => import("@/messages/ar.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
};
