"use server";

import { PdfExportAdapter } from "@/infrastructure/adapters/PdfExportAdapter";
import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { TemplateUseCase } from "@/domain/useCases/TemplateUseCase";
import { PrismaTemplateAdapter } from "@/infrastructure/repositories/PrismaTemplateAdapter";
import { UserTemplateDataUseCase } from "@/domain/useCases/UserTemplateDataUseCase";
import { PrismaUserTemplateDataAdapter } from "@/infrastructure/repositories/PrismaUserTemplateDataAdapter";
import { CreateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/CreateUserTemplateData.dto";
import { prisma } from "@/infrastructure/services/prisma/client";
import { Template } from "@/domain/entities/Template";

export type SavedFormItem = {
  id: string;
  name: string;
  data: Record<string, string>;
};

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

export async function getUserTemplateDataListAction(
  userId: string,
  templateId: string,
): Promise<SavedFormItem[]> {
  try {
    const useCase = new UserTemplateDataUseCase(
      new PrismaUserTemplateDataAdapter(prisma),
    );
    const all = await useCase.getAllByUserId(userId);
    return all
      .filter((item) => item.templateId === templateId)
      .map((item) => ({ id: item.id, name: item.name, data: item.data }));
  } catch (error) {
    console.error("[getUserTemplateDataListAction]", error);
    return [];
  }
}

export async function saveUserTemplateDataAction(
  userId: string,
  templateId: string,
  name: string,
  data: Record<string, string>,
): Promise<SavedFormItem> {
  try {
    const useCase = new UserTemplateDataUseCase(
      new PrismaUserTemplateDataAdapter(prisma),
    );
    const [validationError, dto] = CreateUserTemplateDataDTO.create({
      userId,
      templateId,
      name,
      data,
    });
    if (validationError || !dto) {
      throw new Error(validationError ?? "Datos inválidos.");
    }
    const created = await useCase.create(dto);
    return { id: created.id, name: created.name, data: created.data };
  } catch (error) {
    console.error("[saveUserTemplateDataAction]", error);
    throw new Error(
      error instanceof Error ? error.message : "Error al guardar el formulario.",
    );
  }
}

export async function deleteUserTemplateDataAction(id: string): Promise<void> {
  try {
    const useCase = new UserTemplateDataUseCase(
      new PrismaUserTemplateDataAdapter(prisma),
    );
    await useCase.delete(id);
  } catch (error) {
    console.error("[deleteUserTemplateDataAction]", error);
    throw new Error("Error al eliminar el formulario.");
  }
}
