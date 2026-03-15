import { Metadata } from "next";
import { RegisterForm } from "./components/RegisterForm";
import { registerAction } from "./actions";
import { Logo } from "@/presentation/components/Logo/Logo";
import { i18nConfig, type Locale } from "@/infrastructure/i18n/config";
import { notFound } from "next/navigation";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.metadata.registerTitle,
    description: dict.metadata.registerDescription,
  };
}

export default async function RegisterPage({ params }: Readonly<Props>) {
  const { lang } = await params;
  if (!i18nConfig.locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-col bg-foreground p-10 text-background dark:border-r border-accent-foreground hidden lg:flex lg:w-1/2">
        <Logo />
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:p-12 lg:w-1/2">
        <div className="flex w-full flex-col justify-center items-center gap-16 sm:max-w-md">
          <div className="lg:hidden">
            <Logo orientation="vertical" />
          </div>

          <RegisterForm
            onSubmit={registerAction}
            translations={{ ...dict.register, ...dict.common }}
            validationTranslations={dict.validation}
            lang={lang as Locale}
          />
        </div>
      </div>
    </div>
  );
}
