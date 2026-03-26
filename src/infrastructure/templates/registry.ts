import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";

export type TemplateCategory = "legal" | "business" | "personal" | "other";

export interface ITemplateMetadata {
  slug: string;
  category: TemplateCategory;
  displayNameKey: string;
  descriptionKey: string;
  component: React.ComponentType<{
    fields: TemplateFieldDefinition[];
    userInfo: IAuthResponse | null;
  }>;
  fields: TemplateFieldDefinition[];
}

// Registry of all available template metadata
const templateRegistry: Record<string, ITemplateMetadata> = {};

/**
 * Register a new template metadata
 */
export function registerTemplate(metadata: ITemplateMetadata): void {
  templateRegistry[metadata.slug] = metadata;
}

/**
 * Get template metadata by slug
 * @param slug - The template slug
 * @returns The template metadata or undefined if not found
 */
export function getTemplate(slug: string): ITemplateMetadata | undefined {
  return templateRegistry[slug];
}

/**
 * Get all registered template metadata
 * @returns Array of all template metadata
 */
export function getAllTemplates(): ITemplateMetadata[] {
  return Object.values(templateRegistry);
}
