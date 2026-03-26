import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SettingsForm } from "./components/SettingsForm";
import { updateProfileAction } from "./actions";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.metadata.settingsTitle,
    description: dict.metadata.settingsDescription,
  };
}

export default async function SettingsPage({ params }: Readonly<Props>) {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();

  const supabase = await createClient();
  const adapter = new SupabaseAuthAdapter(supabase);
  const authResponse = await adapter.getCurrentUser();

  if (!authResponse) {
    redirect(`/${lang}/login`);
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-12">
      <div className="flex w-full flex-col justify-center items-center gap-16 sm:max-w-lg">
        <SettingsForm
          onSubmit={updateProfileAction}
          translations={dict.settings}
          validationTranslations={{
            fullNameRequired: dict.validation.fullNameRequired,
            phoneInvalid: dict.validation.phoneInvalid,
          }}
          lang={lang as Locale}
          defaultValues={{
            fullName: authResponse.user.fullName ?? "",
            city: authResponse.user.city ?? "",
            company: authResponse.user.company ?? "",
            companyNit: authResponse.user.companyNit ?? "",
            phone: authResponse.user.phone ?? "",
            dni: authResponse.user.dni ?? "",
          }}
        />
      </div>
    </div>
  );
}
