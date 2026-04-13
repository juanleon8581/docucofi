export type TemplateCategory = "legal" | "business" | "personal" | "other";

export interface TemplateFieldData {
  name: string;
  label: string;
  type: string;
  defaultValue: string;
  placeholder: string | null;
  options: string[];
  dateMode: "single" | "multiple" | null;
  isDisabled: boolean;
  isAuto: boolean;
}

export interface Template {
  id: string;
  slug: string;
  category: TemplateCategory;
  displayNameKey: string;
  descriptionKey: string;
  fields: TemplateFieldData[];
  createdAt: Date;
  updatedAt: Date;
}
