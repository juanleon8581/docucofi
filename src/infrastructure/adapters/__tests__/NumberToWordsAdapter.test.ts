import { describe, it, expect } from "vitest";
import { NumberToWordsAdapter } from "../NumberToWordsAdapter";

describe("NumberToWordsAdapter", () => {
  describe("toWords", () => {
    it("converts zero", () => {
      expect(NumberToWordsAdapter.toWords(0)).toBe("Cero");
    });

    it("converts integer amounts", () => {
      expect(NumberToWordsAdapter.toWords(1500)).toBe("Mil Quinientos");
    });

    it("converts large amounts", () => {
      expect(NumberToWordsAdapter.toWords(1500000)).toBe(
        "Un Millon Quinientos Mil",
      );
    });

    it("converts decimal amounts", () => {
      expect(NumberToWordsAdapter.toWords(1500.5)).toBe(
        "Mil Quinientos Punto Cinco",
      );
    });
  });

  describe("fromString", () => {
    it("converts a valid numeric string", () => {
      expect(NumberToWordsAdapter.fromString("500000")).toBe("Quinientos Mil");
    });

    it("returns empty string for non-numeric input", () => {
      expect(NumberToWordsAdapter.fromString("abc")).toBe("");
    });

    it("returns empty string for empty string", () => {
      expect(NumberToWordsAdapter.fromString("")).toBe("");
    });

    it("converts string with decimal", () => {
      expect(NumberToWordsAdapter.fromString("1500.5")).toBe(
        "Mil Quinientos Punto Cinco",
      );
    });
  });
});
