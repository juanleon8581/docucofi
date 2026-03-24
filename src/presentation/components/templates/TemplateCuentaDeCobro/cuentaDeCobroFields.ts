import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";

export const cuentaDeCobroFields: TemplateFieldDefinition[] = [
  {
    name: "city",
    label: "Ciudad",
    type: "text",
    defaultValue: "_CIUDAD_",
  },
  {
    name: "date",
    label: "Fecha",
    type: "date",
    dateMode: "single",
    defaultValue: DateAdapter.toISOString(new Date()),
  },
  {
    name: "company",
    label: "Empresa",
    type: "text",
    defaultValue: "_INSERTE EMPRESA S.A.S_",
  },
  { name: "nit", label: "NIT", type: "text", defaultValue: "_00000000-1_" },
  {
    name: "name",
    label: "Nombre",
    type: "text",
    defaultValue: "_INSERTE NOMBRE_",
  },
  {
    name: "cc",
    label: "Cédula (CC)",
    type: "text",
    defaultValue: "_1234567890_",
  },
  { name: "amount", label: "Valor ($)", type: "number", defaultValue: "0" },
  {
    name: "concept",
    label: "Concepto",
    type: "text",
    defaultValue: "Pago por servicios profesionales prestados",
  },
  {
    name: "accountNumber",
    label: "Número de cuenta",
    type: "text",
    defaultValue: "_1234567890_",
  },
  {
    name: "bank",
    label: "Banco",
    type: "text",
    defaultValue: "_BANCO_",
  },
  {
    name: "signature",
    label: "Firma (imagen)",
    type: "file",
    defaultValue: "",
  },
];

export const cuentaDeCobroConceptoFechasFields: TemplateFieldDefinition[] = [
  {
    name: "city",
    label: "Ciudad",
    type: "text",
    defaultValue: "_CIUDAD_",
  },
  {
    name: "date",
    label: "Fecha",
    type: "date",
    dateMode: "single",
    defaultValue: DateAdapter.toISOString(new Date()),
  },
  {
    name: "company",
    label: "Empresa",
    type: "text",
    defaultValue: "_INSERTE EMPRESA S.A.S_",
  },
  { name: "nit", label: "NIT", type: "text", defaultValue: "_00000000-1_" },
  {
    name: "name",
    label: "Nombre",
    type: "text",
    defaultValue: "_INSERTE NOMBRE_",
  },
  {
    name: "cc",
    label: "Cédula (CC)",
    type: "text",
    defaultValue: "_1234567890_",
  },
  { name: "amount", label: "Valor ($)", type: "number", defaultValue: "0" },
  {
    name: "concept",
    label: "Concepto",
    type: "text",
    defaultValue:
      "Pago por servicios profesionales prestados en las siguientes fechas: ",
  },
  {
    name: "dates",
    label: "Fechas",
    type: "date",
    dateMode: "multiple",
    defaultValue: "",
  },
  {
    name: "accountNumber",
    label: "Número de cuenta",
    type: "text",
    defaultValue: "_1234567890_",
  },
  {
    name: "bank",
    label: "Banco",
    type: "text",
    defaultValue: "_BANCO_",
  },
  {
    name: "signature",
    label: "Firma (imagen)",
    type: "file",
    defaultValue: "",
  },
];
