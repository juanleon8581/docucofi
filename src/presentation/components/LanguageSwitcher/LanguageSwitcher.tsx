"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";

const languageLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

interface Props {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: Readonly<Props>) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    // Segment 0 is "" (before leading slash), segment 1 is the locale
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-1 items-center">
      {i18nConfig.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-muted-foreground/50 text-xs select-none">
              |
            </span>
          )}
          <button
            onClick={() => switchLocale(locale as Locale)}
            disabled={locale === currentLocale}
            aria-label={`Switch to ${languageLabels[locale as Locale]}`}
            className={`text-xs font-medium transition-colors ${
              locale === currentLocale
                ? "text-foreground font-semibold cursor-default"
                : "text-muted-foreground hover:text-foreground cursor-pointer"
            }`}
          >
            {languageLabels[locale as Locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
