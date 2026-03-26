import { Button } from "@/presentation/components/ui/button";
import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Home({ params }: Readonly<Props>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto flex h-full w-4/5 flex-col items-center justify-center gap-6">
      <h1 className="md:text-5xl!">{dict.home.title}</h1>
      <h3>{dict.home.subtitle}</h3>
      <p className="max-w-xl text-center text-lg text-muted-foreground">
        {dict.home.description}
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <LocalizedLink href="/login" locale={lang}>
            {dict.login.submitButton}
          </LocalizedLink>
        </Button>
        <Button asChild>
          <LocalizedLink href="/register" locale={lang}>
            {dict.register.submitButton}
          </LocalizedLink>
        </Button>
      </div>
    </section>
  );
}
