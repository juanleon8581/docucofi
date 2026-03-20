import { registerTemplate } from "@/infrastructure/templates/registry";

// Register all templates (metadata only)
registerTemplate({
  slug: "placeholder",
  category: "other",
  displayNameKey: "templates.placeholder.name",
  descriptionKey: "templates.placeholder.description",
});
