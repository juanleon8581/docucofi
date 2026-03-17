import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { loginAction } from "./actions";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.metadata.loginTitle,
    description: dict.metadata.loginDescription,
  };
}

export default async function LoginPage({ params }: Readonly<Props>) {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-12">
      <div className="flex w-full flex-col justify-center items-center gap-16 sm:max-w-md">
        <LoginForm
          onSubmit={loginAction}
          translations={{ ...dict.login, ...dict.common }}
          validationTranslations={dict.validation}
          lang={lang as Locale}
        />
      </div>
    </div>
  );
}
