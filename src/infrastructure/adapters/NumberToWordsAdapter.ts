import { ToWords } from "to-words";

const toWords = new ToWords({ localeCode: "es-ES" });

export class NumberToWordsAdapter {
  static toWords(value: number): string {
    return toWords.convert(value);
  }

  static fromString(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return NumberToWordsAdapter.toWords(num);
  }
}
