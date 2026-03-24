import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

import { Toaster } from "@/presentation/components/Toaster/Toaster";
import { HeaderNavBar } from "@/presentation/components/HeaderNavBar/HeaderNavBar";
import { InternalHeader } from "@/presentation/components/internal/InternalHeader/InternalHeader";
import { AppSidebar } from "@/presentation/components/internal/Sidebar/Sidebar";
import { SidebarProvider } from "@/presentation/components/ui/sidebar";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { createClient } from "@/infrastructure/services/supabase/server";

import "@/presentation/styles/globals.css";
import "@/presentation/styles/globals.texts.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CofiAuth",
  description: "Authentication module",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) as { lang: Locale };

  if (!i18nConfig.locales.includes(lang as Locale)) {
    notFound();
  }

  let authResponse = null;
  try {
    const supabase = await createClient();
    const adapter = new SupabaseAuthAdapter(supabase);
    authResponse = await adapter.getCurrentUser();
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col antialiased`}
      >
        {authResponse ? (
          <>
            <InternalHeader user={authResponse.user} lang={lang} />
            <SidebarProvider defaultOpen={false} className="min-h-0! flex-1">
              <AppSidebar user={authResponse.user} lang={lang} />
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarProvider>
          </>
        ) : (
          <>
            <HeaderNavBar lang={lang} />
            <main className="flex flex-1 items-center justify-center">
              {children}
            </main>
          </>
        )}
        <Toaster />
      </body>
    </html>
  );
}
