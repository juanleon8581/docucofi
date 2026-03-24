import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { NumberToWordsAdapter } from "@/infrastructure/adapters/NumberToWordsAdapter";

function formatCurrency(value: string): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function buildDatesList(datesValue: string): string {
  if (!datesValue) return "";
  const days = datesValue.split(",").filter(Boolean);
  if (days.length === 0) return "";
  return `
    <div style="margin: 24px 0; display: flex; flex-wrap: wrap;">
      ${days
        .map(
          (day) => `
        <p style="width: 33.333%; padding-left: 16px; font-weight: 500; margin: 4px 0; display: flex; align-items: center;">
          <span style="margin-right: 4px;">›</span>
          <span>${DateAdapter.formatDisplayFromString(day.trim())}</span>
        </p>
      `,
        )
        .join("")}
    </div>
  `;
}

function buildSignatureBlock(signature: string): string {
  if (signature) {
    return `<img src="${signature}" alt="Firma" style="max-height: 64px; max-width: 208px; object-fit: contain;" />`;
  }
  return `<strong>____________________________________</strong>`;
}

export function buildCuentaDeCobroHtml(fields: Record<string, string>): string {
  const city = fields["city"] ?? "";
  const date = fields["date"] ?? "";
  const company = fields["company"] ?? "";
  const nit = fields["nit"] ?? "";
  const name = fields["name"] ?? "";
  const cc = fields["cc"] ?? "";
  const amount = fields["amount"] ?? "0";
  const concept = fields["concept"] ?? "";
  const dates = fields["dates"] ?? "";
  const accountNumber = fields["accountNumber"] ?? "";
  const bank = fields["bank"] ?? "";
  const signature = fields["signature"] ?? "";

  const displayDate = DateAdapter.formatDisplayFromString(date);
  const formattedAmount = formatCurrency(amount);
  const amountInWords = NumberToWordsAdapter.fromString(amount);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cuenta de Cobro</title>
  <style>
    @page { size: LETTER; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      height: auto;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 14px;
      color: #111111;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <div style="padding: 48px; max-width: 210mm;">

    <p style="text-align: right; font-weight: bold; margin: 0 0 64px 0;">
      ${city}, ${displayDate}
    </p>

    <p style="text-align: center; font-size: 18px; font-weight: bold; margin: 0 0 4px 0; text-transform: uppercase;">
      ${company}
    </p>
    <p style="text-align: center; margin: 0 0 64px 0; color: #444444;">
      NIT: ${nit}
    </p>

    <p style="text-align: left; font-weight: bold; margin: 0 0 8px 0;">DEBE A:</p>
    <p style="text-align: left; margin: 0 0 4px 0; font-weight: 600; color: #333333;">
      ${name}
    </p>
    <p style="text-align: left; margin: 0 0 24px 0;">
      <span style="font-weight: 600; color: #333333;">CC</span> ${cc}
    </p>

    <p style="text-align: left; margin: 0 0 4px 0;">
      <span style="font-weight: 600; color: #333333;">LA SUMA DE:</span>
      ${formattedAmount}
    </p>
    <p style="text-align: left; margin: 0 0 24px 0; font-size: 13px;">
      <strong>${amountInWords}</strong> En pesos Colombianos
    </p>

    <p style="text-align: left; font-weight: bold; margin: 0 0 8px 0;">CONCEPTO:</p>
    <p style="text-align: left; margin: 0 0 0 0;">${concept}</p>

    ${buildDatesList(dates)}

    <p style="text-align: left; margin: 0 0 4px 0;">Por favor consignar en:</p>
    <p style="text-align: left; margin: 0 0 4px 0;">
      Cuenta de <span style="font-weight: 600; color: #333333;">ahorros</span> No.
      <span style="font-weight: 600; color: #333333;">${accountNumber}</span>
    </p>
    <p style="text-align: left; margin: 0 0 40px 0;">
      Banco: <span style="font-weight: 600; color: #333333;">${bank}</span>
    </p>

    <p style="text-align: left; margin: 0 0 48px 0;">Atentamente,</p>

    <div style="text-align: left; margin: 0 0 24px 0;">
      ${buildSignatureBlock(signature)}
    </div>

    <p style="text-align: left; font-weight: bold; margin: 0 0 8px 0;">Información tributaria</p>
    <p style="text-align: left; margin: 0 0 8px 0; font-size: 13px;">
      No soy responsable de IVA, ni de IMPOCONSUMO y no estoy obligado a facturar.
    </p>
    <p style="text-align: left; font-size: 13px; margin: 0;">
      De acuerdo con lo establecido en el parágrafo 2 del artículo 383 del estatuto tributario,
      declaro que para la prestación del servicio no he contratado o vinculado dos (2) personas
      o más trabajadores asociados a dicha actividad. Solicito que lo anterior sea tenido en
      cuenta para efectos de retención en la fuente.
    </p>

  </div>
</body>
</html>`;
}
