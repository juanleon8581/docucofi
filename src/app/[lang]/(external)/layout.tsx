import React from "react";
import { type Locale } from "@/infrastructure/i18n/config";
import { HeaderNavBar } from "@/presentation/components/HeaderNavBar/HeaderNavBar";

export default async function ExternalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params as { lang: Locale };

  return (
    <>
      <HeaderNavBar lang={lang} />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </>
  );
}
