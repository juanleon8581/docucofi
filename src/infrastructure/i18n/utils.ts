import type { Locale } from "./config";

/**
 * Prefixes a path with the current locale.
 * Example: localizedPath('es', '/register') → '/es/register'
 */
export function localizedPath(locale: Locale, path: string): string {
  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${pathWithSlash}`;
}
