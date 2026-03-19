import React from "react";
import { redirect } from "next/navigation";
import { Locale } from "@/infrastructure/i18n/config";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { createClient } from "@/infrastructure/services/supabase/server";
import { InternalHeader } from "@/presentation/components/internal/InternalHeader/InternalHeader";
import { Sidebar } from "@/presentation/components/internal/Sidebar/Sidebar";

export default async function InternalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) as { lang: Locale };
  const supabase = await createClient();
  const adapter = new SupabaseAuthAdapter(supabase);
  const authResponse = await adapter.getCurrentUser();

  if (!authResponse) {
    redirect(`/${lang}/login`);
  }

  return (
    <div className="flex flex-1 flex-col">
      <InternalHeader user={authResponse.user} lang={lang} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
