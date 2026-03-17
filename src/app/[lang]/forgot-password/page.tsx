import { Metadata } from "next";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { forgotPasswordAction } from "./actions";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.metadata.forgotPasswordTitle,
    description: dict.metadata.forgotPasswordDescription,
  };
}

export default async function ForgotPasswordPage({ params }: Readonly<Props>) {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-12">
      <div className="flex w-full flex-col justify-center items-center gap-16 sm:max-w-md">
        <ForgotPasswordForm
          onSubmit={forgotPasswordAction}
          translations={{ ...dict.forgotPassword, ...dict.common }}
          validationTranslations={dict.validation}
          lang={lang as Locale}
        />
      </div>
    </div>
  );
}
