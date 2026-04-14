"use server";

import { PdfExportAdapter } from "@/infrastructure/adapters/PdfExportAdapter";
import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { TemplateUseCase } from "@/domain/useCases/TemplateUseCase";
import { PrismaTemplateAdapter } from "@/infrastructure/repositories/PrismaTemplateAdapter";
import { prisma } from "@/infrastructure/services/prisma/client";
import { Template } from "@/domain/entities/Template";

export async function exportToPdfAction(
  fields: Record<string, string>,
): Promise<string> {
  try {
    const buffer = await PdfExportAdapter.fromFields(fields);
    return buffer.toString("base64");
  } catch (error) {
    console.error("[exportToPdfAction]", error);
    throw new Error("Error al generar el PDF. Intenta de nuevo.");
  }
}

export async function getTemplateBySlugAction(
  slug: string,
): Promise<Template | null> {
  try {
    const useCase = new TemplateUseCase(new PrismaTemplateAdapter(prisma));
    return await useCase.getBySlug(slug);
  } catch (error) {
    console.error("[getTemplateBySlugAction]", error);
    return null;
  }
}

export async function getUserInfo() {
  try {
    const supabase = await createClient();
    const authAdapter = new SupabaseAuthAdapter(supabase);
    return await authAdapter.getCurrentUser();
  } catch {
    return null;
  }
}
