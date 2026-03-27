"use server";

import { buildCuentaDeCobroHtml } from "@/infrastructure/templates/cuentaDeCobroHtmlTemplate";
import { PdfExportAdapter } from "@/infrastructure/adapters/PdfExportAdapter";
import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";

export async function exportToPdfAction(
  fields: Record<string, string>,
): Promise<string> {
  const html = buildCuentaDeCobroHtml(fields);
  const buffer = await PdfExportAdapter.fromHtml(html);
  return buffer.toString("base64");
}

export async function getUserInfo() {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);
  try {
    const session = await authAdapter.getCurrentUser();
    return session;
  } catch (error) {
    if (error) return null;
  }
}
