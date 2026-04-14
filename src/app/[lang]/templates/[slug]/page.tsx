import { notFound } from "next/navigation";
import { Locale } from "@/infrastructure/i18n/config";
import {
  getDictionary,
  getTemplateTranslations,
} from "@/infrastructure/i18n/dictionaries";
import "@/presentation/styles/templates.css";
import { getTemplateBySlugAction, getUserInfo } from "./actions";
import { templateComponents } from "@/presentation/components/templates";
import { mapTemplateFields } from "@/infrastructure/mappers/TemplateFieldMapper";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function TemplatePage({ params }: Readonly<Props>) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const [template, userInfo] = await Promise.all([
    getTemplateBySlugAction(slug),
    getUserInfo(),
  ]);

  if (!template) {
    notFound();
  }

  const templateDict = getTemplateTranslations(dict, slug);
  const templateName = templateDict?.name ?? slug;
  const TemplateComponent = templateComponents[slug];

  if (TemplateComponent) {
    const fields = mapTemplateFields(template.fields);
    return <TemplateComponent fields={fields} userInfo={userInfo} />;
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
  const template = await getTemplateBySlugAction(slug);

  if (!template) {
    return { title: "Template Not Found" };
  }

  const templateName = getTemplateTranslations(dict, slug)?.name ?? slug;

  return {
    title: `${templateName} | DocuCofi`,
    description: `Use the ${templateName} template to create your document.`,
  };
}
