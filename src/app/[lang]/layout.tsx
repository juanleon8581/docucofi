import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/presentation/components/Toaster/Toaster";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import React from "react";

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
  const { lang } = await params;

  if (!i18nConfig.locales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
