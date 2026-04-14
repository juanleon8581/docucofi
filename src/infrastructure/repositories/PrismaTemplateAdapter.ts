import { PrismaClient } from "@prisma/client";
import { TemplateRepository } from "@/domain/repositories/ITemplateRepository";
import { Template } from "@/domain/entities/Template";

export class PrismaTemplateAdapter implements TemplateRepository {
  private readonly client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getBySlug(slug: string): Promise<Template | null> {
    const template = await this.client.template.findUnique({ where: { slug } });
    return template ? Template.fromRaw(template) : null;
  }

  async getAll(): Promise<Template[]> {
    const templates = await this.client.template.findMany();
    return templates.map((t) => Template.fromRaw(t));
  }
}
