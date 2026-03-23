import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";

export const cuentaDeCobroFields: TemplateFieldDefinition[] = [
  { name: "ciudad", label: "Ciudad", type: "text", defaultValue: "INSERTE CIUDAD" },
  { name: "fecha", label: "Fecha", type: "text", defaultValue: "20 de marzo de 2026" },
  { name: "empresa", label: "Empresa", type: "text", defaultValue: "INSERTE EMPRESA S.A.S" },
  { name: "nit", label: "NIT", type: "text", defaultValue: "INSERTE NIT" },
  { name: "nombre", label: "Nombre", type: "text", defaultValue: "INSERTE NOMBRE" },
  { name: "cc", label: "Cédula (CC)", type: "text", defaultValue: "INSERTE CC" },
  { name: "valor", label: "Valor ($)", type: "number", defaultValue: "0" },
  { name: "valorEnLetras", label: "Valor en letras", type: "text", defaultValue: "INSERTE VALOR EN LETRAS" },
  { name: "concepto", label: "Concepto", type: "text", defaultValue: "INSERTE CONCEPTO" },
  { name: "numeroCuenta", label: "Número de cuenta", type: "text", defaultValue: "1234567890" },
  { name: "banco", label: "Banco", type: "text", defaultValue: "INSERTE BANCO" },
];
