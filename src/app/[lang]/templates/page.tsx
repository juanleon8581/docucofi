import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { TemplateCard } from "@/presentation/components/TemplateCard/TemplateCard";
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
          {templates.map((template) => {
            const templateDict = dict.templates[
              template.slug as keyof typeof dict.templates
            ] as Record<string, string>;

            const templateCardInfo = {
              title: templateDict.name || template.slug,
              description: templateDict.description || "No description",
              buttonText: dict.templates.buttonText || "View Template",
              href: `/templates/${template.slug}`,
              locale: lang,
            };

            return <TemplateCard key={template.slug} {...templateCardInfo} />;
          })}
        </div>
      )}
    </div>
  );
}
