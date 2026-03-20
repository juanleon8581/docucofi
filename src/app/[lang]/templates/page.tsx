import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";
import { Button } from "@/presentation/components/ui/button";
import { getAllTemplates } from "@/infrastructure/templates/registry";
import "@/presentation/components/templates"; // Import to trigger template registration

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function TemplatesPage({ params }: Readonly<Props>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const templates = getAllTemplates();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{dict.templates.title}</h1>
      <p className="text-muted-foreground mb-6">{dict.templates.subtitle}</p>
      <p className="text-muted-foreground mb-8">{dict.templates.description}</p>

      {templates.length === 0 ? (
        <p className="text-muted-foreground">No templates available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.slug}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {dict.templates[template.slug as keyof typeof dict.templates]
                  ? // @ts-expect-error - Dynamic access to template keys
                    dict.templates[template.slug].name
                  : template.slug}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {dict.templates[template.slug as keyof typeof dict.templates]
                  ? // @ts-expect-error - Dynamic access to template keys
                    dict.templates[template.slug].description
                  : "No description"}
              </p>
              <Button variant="outline" asChild className="w-full">
                <LocalizedLink href={`/templates/${template.slug}`} locale={lang}>
                  View Template
                </LocalizedLink>
              </Button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
