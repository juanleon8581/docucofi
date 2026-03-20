import { notFound } from "next/navigation";
import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { getTemplate } from "@/infrastructure/templates/registry";
import { TemplatePlaceholder } from "@/presentation/components/templates/TemplatePlaceholder";
import "@/presentation/components/templates"; // Import to trigger template registration

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

  const templateName =
    dict.templates[slug as keyof typeof dict.templates]
      ? // @ts-expect-error - Dynamic access to template keys
        dict.templates[slug].name
      : slug;

  // Render the appropriate template component
  // For now, only TemplatePlaceholder exists
  if (slug === "placeholder") {
    return <TemplatePlaceholder />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{templateName}</h1>
      <p className="text-muted-foreground mb-8">
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

  const templateName =
    dict.templates[slug as keyof typeof dict.templates]
      ? // @ts-expect-error - Dynamic access to template keys
        dict.templates[slug].name
      : slug;

  return {
    title: `${templateName} | DocuCofi`,
    description: `Use the ${templateName} template to create your document.`,
  };
}

export async function generateStaticParams() {
  // Return static params for all registered templates
  return [];
}
