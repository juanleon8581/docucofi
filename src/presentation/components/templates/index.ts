import { registerTemplate } from "@/infrastructure/templates/registry";
import { TemplatePlaceholder } from "./TemplatePlaceholder";
import { TemplateCuentaDeCobro } from "./TemplateCuentaDeCobro/TemplateCuentaDeCobro";
import { cuentaDeCobroFields } from "./TemplateCuentaDeCobro/cuentaDeCobroFields";

// Register all templates (metadata only)
registerTemplate({
  slug: "placeholder",
  category: "other",
  displayNameKey: "templates.placeholder.name",
  descriptionKey: "templates.placeholder.description",
  component: TemplatePlaceholder,
});

registerTemplate({
  slug: "cuenta-de-cobro",
  category: "other",
  displayNameKey: "templates.cuentaDeCobro.name",
  descriptionKey: "templates.cuentaDeCobro.description",
  component: TemplateCuentaDeCobro,
  fields: cuentaDeCobroFields,
});
