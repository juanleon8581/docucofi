import { Locale } from "@/infrastructure/i18n/config";
import {
  getDictionary,
  getTemplateTranslations,
} from "@/infrastructure/i18n/dictionaries";
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
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-2 text-3xl font-bold">{dict.templates.title}</h1>
      <p className="mb-6 text-muted-foreground">{dict.templates.subtitle}</p>
      <p className="mb-8 text-muted-foreground">{dict.templates.description}</p>

      {templates.length === 0 ? (
        <p className="text-muted-foreground">No templates available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const templateDict = getTemplateTranslations(dict, template.slug);

            const templateCardInfo = {
              title: templateDict?.name ?? template.slug,
              description: templateDict?.description ?? "No description",
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
