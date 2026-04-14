import { Template } from "../entities/Template";

export abstract class TemplateRepository {
  abstract getBySlug(slug: string): Promise<Template | null>;
  abstract getAll(): Promise<Template[]>;
}
