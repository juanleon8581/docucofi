import { IRawJson } from "@/domain/interfaces/IRawJson";

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

export interface ITemplate {
  id: string;
  slug: string;
  category: TemplateCategory;
  displayNameKey: string;
  descriptionKey: string;
  fields: TemplateFieldData[];
  createdAt: Date;
  updatedAt: Date;
}

export class Template implements ITemplate {
  private constructor(
    public id: string,
    public slug: string,
    public category: TemplateCategory,
    public displayNameKey: string,
    public descriptionKey: string,
    public fields: TemplateFieldData[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromRaw(raw: IRawJson): Template {
    return new Template(
      raw.id,
      raw.slug,
      raw.category as TemplateCategory,
      raw.displayNameKey,
      raw.descriptionKey,
      raw.fields as unknown as TemplateFieldData[],
      raw.createdAt as Date,
      raw.updatedAt as Date,
    );
  }
}
