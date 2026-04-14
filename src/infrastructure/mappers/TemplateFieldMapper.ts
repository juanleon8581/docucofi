import type { TemplateFieldData } from "@/domain/entities/Template";
import type {
  FieldType,
  TemplateFieldDefinition,
} from "@/domain/entities/TemplateField";

export function mapTemplateFields(
  fields: TemplateFieldData[],
): TemplateFieldDefinition[] {
  return fields.map((field) => {
    const definition: TemplateFieldDefinition = {
      name: field.name,
      label: field.label,
      type: field.type as FieldType,
      defaultValue: field.defaultValue,
    };
    if (field.placeholder !== null) definition.placeholder = field.placeholder;
    if (field.options.length > 0) definition.options = field.options;
    if (field.dateMode !== null) definition.dateMode = field.dateMode;
    if (field.isDisabled || field.isAuto) definition.disabledField = true;
    if (field.isAuto) definition.isAuto = true;
    return definition;
  });
}
