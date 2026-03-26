import { describe, it, expect } from "vitest";
import { buildCuentaDeCobroHtml } from "../cuentaDeCobroHtmlTemplate";

const baseFields: Record<string, string> = {
  city: "Bogotá",
  date: "2026-03-23",
  company: "Empresa Test S.A.S",
  nit: "900123456-1",
  name: "Juan Pérez",
  cc: "1234567890",
  amount: "5000000",
  concept: "Pago por servicios",
  dates: "",
  accountNumber: "0987654321",
  bank: "Bancolombia",
  signature: "",
};

describe("buildCuentaDeCobroHtml", () => {
  it("returns a valid HTML document", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    expect(html).toContain("<body");
    expect(html).toContain("</body>");
  });

  it("interpolates city and formatted date", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("Bogotá");
    expect(html).toContain("23 de marzo de 2026");
  });

  it("interpolates company and NIT", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("Empresa Test S.A.S");
    expect(html).toContain("NIT: 900123456-1");
  });

  it("interpolates name and CC", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("Juan Pérez");
    expect(html).toContain("1234567890");
  });

  it("formats amount as COP currency", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    // Intl.NumberFormat formats 5000000 COP as "$\u00a05.000.000" or similar
    expect(html).toContain("5.000.000");
  });

  it("includes amount in words", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    // NumberToWordsAdapter converts 5000000 to words in Spanish
    expect(html.toLowerCase()).toContain("cinco");
  });

  it("interpolates concept, account number, and bank", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("Pago por servicios");
    expect(html).toContain("0987654321");
    expect(html).toContain("Bancolombia");
  });

  it("shows signature placeholder when signature is empty", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    expect(html).toContain("____________________________________");
    expect(html).not.toContain("<img");
  });

  it("shows signature image when signature base64 is provided", () => {
    const fieldsWithSignature = {
      ...baseFields,
      signature: "data:image/png;base64,abc123",
    };
    const html = buildCuentaDeCobroHtml(fieldsWithSignature);
    expect(html).toContain('<img src="data:image/png;base64,abc123"');
    expect(html).not.toContain("____________________________________");
  });

  it("renders date list items when dates are provided", () => {
    const fieldsWithDates = {
      ...baseFields,
      dates: "2026-03-01,2026-03-15",
    };
    const html = buildCuentaDeCobroHtml(fieldsWithDates);
    expect(html).toContain("1 de marzo de 2026");
    expect(html).toContain("15 de marzo de 2026");
  });

  it("omits date list when dates field is empty", () => {
    const html = buildCuentaDeCobroHtml(baseFields);
    // No chevron/arrow items should be present
    expect(html).not.toContain("›");
  });

  it("omits date list when dates field contains only commas", () => {
    const fieldsWithEmptyDates = { ...baseFields, dates: ",,," };
    const html = buildCuentaDeCobroHtml(fieldsWithEmptyDates);
    expect(html).not.toContain("›");
  });

  it("handles missing fields gracefully with empty strings", () => {
    const html = buildCuentaDeCobroHtml({});
    expect(html).toContain("<!DOCTYPE html>");
    // Should not throw and should produce a valid document
    expect(html).toContain("DEBE A:");
  });
});
