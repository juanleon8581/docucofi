import { notFound } from "next/navigation";
import { Locale } from "@/infrastructure/i18n/config";
import {
  getDictionary,
  getTemplateTranslations,
} from "@/infrastructure/i18n/dictionaries";
import { getTemplate } from "@/infrastructure/templates/registry";
import "@/presentation/components/templates"; // Import to trigger template registration
import "@/presentation/styles/templates.css";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export default async function TemplatePage({ params }: Readonly<Props>) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const template = getTemplate(slug);

  if (!template) {
    notFound();
  }

  const templateDict = getTemplateTranslations(dict, slug);
  const templateName = templateDict?.name ?? slug;

  const TemplateComponent = template.component;

  // Render the appropriate template component
  if (TemplateComponent) {
    return <TemplateComponent fields={template.fields} />;
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-4 text-3xl font-bold">{templateName}</h1>
      <p className="mb-8 text-muted-foreground">
        Template component not yet implemented.
      </p>
    </div>
  );
}

export async function generateMetadata({ params }: Readonly<Props>) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const template = getTemplate(slug);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  const templateName = getTemplateTranslations(dict, slug)?.name ?? slug;

  return {
    title: `${templateName} | DocuCofi`,
    description: `Use the ${templateName} template to create your document.`,
  };
}

export async function generateStaticParams() {
  // Return static params for all registered templates
  return [];
}
