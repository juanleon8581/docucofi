import "server-only";

import type { Locale } from "../config";

const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type TemplateTranslations = { name: string; description: string };

export function getTemplateTranslations(
  dict: Dictionary,
  slug: string
): TemplateTranslations | undefined {
  const templates = dict.templates as Record<string, unknown>;
  const entry = templates[slug];
  if (entry && typeof entry === "object" && "name" in entry) {
    return entry as TemplateTranslations;
  }
  return undefined;
}
