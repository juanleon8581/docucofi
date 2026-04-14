"use server";

import { TemplateUseCase } from "@/domain/useCases/TemplateUseCase";
import { PrismaTemplateAdapter } from "@/infrastructure/repositories/PrismaTemplateAdapter";
import { prisma } from "@/infrastructure/services/prisma/client";
import { Template } from "@/domain/entities/Template";

export async function getAllTemplatesAction(): Promise<Template[]> {
  try {
    const useCase = new TemplateUseCase(new PrismaTemplateAdapter(prisma));
    return await useCase.getAll();
  } catch (error) {
    console.error("[getAllTemplatesAction]", error);
    return [];
  }
}
