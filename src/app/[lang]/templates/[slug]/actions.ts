"use server";

import { buildCuentaDeCobroHtml } from "@/infrastructure/templates/cuentaDeCobroHtmlTemplate";
import { PdfExportAdapter } from "@/infrastructure/adapters/PdfExportAdapter";

export async function exportToPdfAction(
  fields: Record<string, string>,
): Promise<string> {
  const html = buildCuentaDeCobroHtml(fields);
  const buffer = await PdfExportAdapter.fromHtml(html);
  return buffer.toString("base64");
}
