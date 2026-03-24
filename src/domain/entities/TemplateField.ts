export type FieldType = "text" | "number" | "date" | "select" | "textarea";

export interface TemplateFieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  defaultValue: string;
  options?: string[];
  placeholder?: string;
  dateMode?: "single" | "multiple";
}
