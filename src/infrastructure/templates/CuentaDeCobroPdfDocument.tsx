import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { NumberToWordsAdapter } from "@/infrastructure/adapters/NumberToWordsAdapter";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 48,
    paddingVertical: 48,
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#111111",
    backgroundColor: "#ffffff",
  },
  rightBold: {
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    marginBottom: 64,
  },
  centerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  centerSubtitle: {
    textAlign: "center",
    color: "#444444",
    marginBottom: 64,
  },
  labelBold: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  accentText: {
    fontFamily: "Helvetica-Bold",
    color: "#333333",
  },
  block: {
    marginBottom: 4,
  },
  blockLg: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    marginBottom: 24,
  },
  dateItem: {
    width: "33%",
    paddingLeft: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    flexDirection: "row",
  },
  footerText: {
    fontSize: 13,
    marginBottom: 8,
  },
});

export function formatCurrencyCOP(value: string): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function buildDatesItems(datesValue: string): string[] {
  if (!datesValue) return [];
  return datesValue.split(",").filter(Boolean);
}

interface Props {
  fields: Record<string, string>;
}

export function CuentaDeCobroPdfDocument({ fields }: Props) {
  const city = fields["city"] ?? "";
  const date = fields["date"] ?? "";
  const company = fields["company"] ?? "";
  const nit = fields["companyNit"] ?? "";
  const name = fields["fullName"] ?? "";
  const cc = fields["dni"] ?? "";
  const amount = fields["amount"] ?? "0";
  const concept = fields["concept"] ?? "";
  const dates = fields["dates"] ?? "";
  const accountNumber = fields["accountNumber"] ?? "";
  const bank = fields["bank"] ?? "";
  const signature = fields["signature"] ?? "";

  const displayDate = DateAdapter.formatDisplayFromString(date);
  const formattedAmount = formatCurrencyCOP(amount);
  const amountInWords = NumberToWordsAdapter.fromString(amount);
  const dateItems = buildDatesItems(dates);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.rightBold}>
          {city}, {displayDate}
        </Text>

        <Text style={styles.centerTitle}>{company}</Text>
        <Text style={styles.centerSubtitle}>NIT: {nit}</Text>

        <Text style={styles.labelBold}>DEBE A:</Text>
        <Text style={[styles.accentText, styles.block]}>{name}</Text>
        <Text style={styles.blockLg}>
          <Text style={styles.accentText}>CC</Text> {cc}
        </Text>

        <Text style={styles.block}>
          <Text style={styles.accentText}>LA SUMA DE: </Text>
          {formattedAmount}
        </Text>
        <Text style={styles.blockLg}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{amountInWords}</Text>{" "}
          En pesos Colombianos
        </Text>

        <Text style={styles.labelBold}>CONCEPTO:</Text>
        <Text style={styles.block}>{concept}</Text>

        {dateItems.length > 0 && (
          <View style={styles.row}>
            {dateItems.map((day) => (
              <View key={day} style={styles.dateItem}>
                <Text>{"› "}</Text>
                <Text>{DateAdapter.formatDisplayFromString(day.trim())}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.block}>Por favor consignar en:</Text>
        <Text style={styles.block}>
          Cuenta de <Text style={styles.accentText}>ahorros</Text> No.{" "}
          <Text style={styles.accentText}>{accountNumber}</Text>
        </Text>
        <Text style={{ marginBottom: 40 }}>
          Banco: <Text style={styles.accentText}>{bank}</Text>
        </Text>

        <Text style={{ marginBottom: 48 }}>Atentamente,</Text>

        <View style={{ marginBottom: 24 }}>
          {signature ? (
            <Image
              src={signature}
              style={{ maxHeight: 64, maxWidth: 208, objectFit: "contain" }}
            />
          ) : (
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              ____________________________________
            </Text>
          )}
        </View>

        <Text style={styles.labelBold}>Información tributaria</Text>
        <Text style={styles.footerText}>
          No soy responsable de IVA, ni de IMPOCONSUMO y no estoy obligado a
          facturar.
        </Text>
        <Text style={{ fontSize: 13 }}>
          De acuerdo con lo establecido en el parágrafo 2 del artículo 383 del
          estatuto tributario, declaro que para la prestación del servicio no he
          contratado o vinculado dos (2) personas o más trabajadores asociados a
          dicha actividad. Solicito que lo anterior sea tenido en cuenta para
          efectos de retención en la fuente.
        </Text>
      </Page>
    </Document>
  );
}
