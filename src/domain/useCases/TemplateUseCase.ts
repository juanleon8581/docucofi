import { TemplateRepository } from "../repositories/ITemplateRepository";
import { Template } from "../entities/Template";

export class TemplateUseCase {
  private readonly repository: TemplateRepository;

  constructor(repository: TemplateRepository) {
    this.repository = repository;
  }

  async getBySlug(slug: string): Promise<Template | null> {
    return this.repository.getBySlug(slug);
  }

  async getAll(): Promise<Template[]> {
    return this.repository.getAll();
  }
}
