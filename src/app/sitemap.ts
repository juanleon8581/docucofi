import type { MetadataRoute } from "next";
import { i18nConfig } from "@/infrastructure/i18n/config";
import { PrismaTemplateAdapter } from "@/infrastructure/repositories/PrismaTemplateAdapter";
import { prisma } from "@/infrastructure/services/prisma/client";

const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password", "/templates"];

function buildAlternates(
  baseUrl: string,
  path: string,
): Record<string, string> {
  return Object.fromEntries(
    i18nConfig.locales.map((l) => [
      l,
      `${baseUrl}/${l}${path === "/" ? "" : path}`,
    ]),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticEntries: MetadataRoute.Sitemap = i18nConfig.locales.flatMap(
    (locale) =>
      PUBLIC_PATHS.map((path) => ({
        url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
        lastModified: new Date(),
        changeFrequency: (path === "/" ? "weekly" : "monthly") as
          | "weekly"
          | "monthly",
        priority: path === "/" ? 1.0 : 0.8,
        alternates: {
          languages: buildAlternates(baseUrl, path),
        },
      })),
  );

  const templates = await new PrismaTemplateAdapter(prisma).getAll();
  const templateEntries: MetadataRoute.Sitemap = i18nConfig.locales.flatMap(
    (locale) =>
      templates.map((template) => ({
        url: `${baseUrl}/${locale}/templates/${template.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: buildAlternates(baseUrl, `/templates/${template.slug}`),
        },
      })),
  );

  return [...staticEntries, ...templateEntries];
}
