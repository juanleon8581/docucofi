import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const templates = [
  {
    slug: "cuenta-de-cobro",
    category: "business" as const,
    displayNameKey: "templates.cuentaDeCobro.name",
    descriptionKey: "templates.cuentaDeCobro.description",
    fields: [
      { name: "city", label: "Ciudad", type: "text", defaultValue: "_CIUDAD_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "date", label: "Fecha", type: "date", defaultValue: "", placeholder: null, options: [], dateMode: "single", isDisabled: false, isAuto: false },
      { name: "company", label: "Empresa", type: "text", defaultValue: "_INSERTE EMPRESA S.A.S_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "companyNit", label: "NIT", type: "text", defaultValue: "_00000000-1_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "fullName", label: "Nombre", type: "text", defaultValue: "_INSERTE NOMBRE_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "dni", label: "Cédula (CC)", type: "text", defaultValue: "_1234567890_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "amount", label: "Valor ($)", type: "number", defaultValue: "0", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "concept", label: "Concepto", type: "text", defaultValue: "Pago por servicios profesionales prestados", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "accountNumber", label: "Número de cuenta", type: "text", defaultValue: "_1234567890_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "bank", label: "Banco", type: "text", defaultValue: "_BANCO_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "signature", label: "Firma (imagen)", type: "file", defaultValue: "", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
    ],
  },
  {
    slug: "cuenta-de-cobro-concepto-fechas",
    category: "business" as const,
    displayNameKey: "templates.cuentaDeCobroConceptoFechas.name",
    descriptionKey: "templates.cuentaDeCobroConceptoFechas.description",
    fields: [
      { name: "city", label: "Ciudad", type: "text", defaultValue: "_CIUDAD_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "date", label: "Fecha", type: "date", defaultValue: "", placeholder: null, options: [], dateMode: "single", isDisabled: false, isAuto: false },
      { name: "company", label: "Empresa", type: "text", defaultValue: "_INSERTE EMPRESA S.A.S_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "companyNit", label: "NIT", type: "text", defaultValue: "_00000000-1_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "fullName", label: "Nombre", type: "text", defaultValue: "_INSERTE NOMBRE_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "dni", label: "Cédula (CC)", type: "text", defaultValue: "_1234567890_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "amount", label: "Valor ($)", type: "number", defaultValue: "0", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "concept", label: "Concepto", type: "text", defaultValue: "Pago por servicios profesionales prestados en las siguientes fechas: ", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "dates", label: "Fechas", type: "date", defaultValue: "", placeholder: null, options: [], dateMode: "multiple", isDisabled: false, isAuto: false },
      { name: "accountNumber", label: "Número de cuenta", type: "text", defaultValue: "_1234567890_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "bank", label: "Banco", type: "text", defaultValue: "_BANCO_", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
      { name: "signature", label: "Firma (imagen)", type: "file", defaultValue: "", placeholder: null, options: [], dateMode: null, isDisabled: false, isAuto: false },
    ],
  },
];

async function main() {
  console.log("Seeding templates...");
  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {
        category: template.category,
        displayNameKey: template.displayNameKey,
        descriptionKey: template.descriptionKey,
        fields: template.fields,
      },
      create: template,
    });
    console.log(`  ✓ ${template.slug}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
