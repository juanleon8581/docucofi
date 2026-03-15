import "server-only";

import type { Locale } from "../config";

const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
