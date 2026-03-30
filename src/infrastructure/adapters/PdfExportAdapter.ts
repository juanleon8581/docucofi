import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CuentaDeCobroPdfDocument } from "@/infrastructure/templates/CuentaDeCobroPdfDocument";

export class PdfExportAdapter {
  static async fromFields(fields: Record<string, string>): Promise<Buffer> {
    const element = React.createElement(CuentaDeCobroPdfDocument, { fields });
    const buffer = await renderToBuffer(element);
    return Buffer.from(buffer);
  }
}
