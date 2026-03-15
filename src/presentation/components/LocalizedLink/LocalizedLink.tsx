// src/presentation/components/LocalizedLink/LocalizedLink.tsx
"use client";

import Link from "next/link";
import type { Locale } from "@/infrastructure/i18n/config";
import { localizedPath } from "@/infrastructure/i18n/utils";

interface Props extends React.ComponentProps<typeof Link> {
  locale: Locale;
}

export function LocalizedLink({ locale, href, ...props }: Readonly<Props>) {
  const localizedHref = localizedPath(locale, href as string);
  return <Link href={localizedHref} {...props} />;
}
