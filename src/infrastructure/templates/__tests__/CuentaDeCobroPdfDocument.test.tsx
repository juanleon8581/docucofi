import { describe, it, expect, vi } from "vitest";
import React from "react";
import {
  CuentaDeCobroPdfDocument,
  formatCurrencyCOP,
  buildDatesItems,
} from "../CuentaDeCobroPdfDocument";

vi.mock("@react-pdf/renderer", () => ({
  Document: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="document">{children}</div>
  ),
  Page: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page">{children}</div>
  ),
  View: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="view">{children}</div>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="text">{children}</span>
  ),
  Image: ({ src }: { src: string }) => (
    <img data-testid="image" src={src} alt="" />
  ),
  StyleSheet: { create: (s: unknown) => s },
}));

vi.mock("@/infrastructure/adapters/DateAdapter", () => ({
  DateAdapter: {
    formatDisplayFromString: (d: string) => `formatted:${d}`,
  },
}));

vi.mock("@/infrastructure/adapters/NumberToWordsAdapter", () => ({
  NumberToWordsAdapter: {
    fromString: (n: string) => `words:${n}`,
  },
}));

describe("formatCurrencyCOP", () => {
  it("formats a valid number as COP currency", () => {
    const result = formatCurrencyCOP("1000000");
    expect(result).toContain("1.000.000");
  });

  it("returns $0 for empty string", () => {
    const result = formatCurrencyCOP("");
    expect(result).toContain("0");
  });

  it("returns $0 for non-numeric string", () => {
    const result = formatCurrencyCOP("abc");
    expect(result).toContain("0");
  });
});

describe("buildDatesItems", () => {
  it("returns empty array for empty string", () => {
    expect(buildDatesItems("")).toEqual([]);
  });

  it("splits comma-separated dates into an array", () => {
    expect(buildDatesItems("2024-01-01,2024-01-02")).toEqual([
      "2024-01-01",
      "2024-01-02",
    ]);
  });

  it("filters out empty entries from trailing commas", () => {
    expect(buildDatesItems("2024-01-01,")).toEqual(["2024-01-01"]);
  });
});

describe("CuentaDeCobroPdfDocument", () => {
  it("renders without throwing with minimal fields", () => {
    expect(() =>
      React.createElement(CuentaDeCobroPdfDocument, { fields: {} }),
    ).not.toThrow();
  });

  it("renders the signature image when signature field is provided", () => {
    const { render } = require("@testing-library/react");
    const { getByTestId } = render(
      React.createElement(CuentaDeCobroPdfDocument, {
        fields: { signature: "data:image/png;base64,abc" },
      }),
    );
    expect(getByTestId("image")).toBeTruthy();
  });

  it("renders the blank line placeholder when signature is absent", () => {
    const { render } = require("@testing-library/react");
    const { getAllByTestId } = render(
      React.createElement(CuentaDeCobroPdfDocument, { fields: {} }),
    );
    const texts = getAllByTestId("text").map((el) => el.textContent);
    expect(texts.some((t) => t?.includes("____"))).toBe(true);
  });

  it("renders date items when dates field is provided", () => {
    const { render } = require("@testing-library/react");
    const { getAllByTestId } = render(
      React.createElement(CuentaDeCobroPdfDocument, {
        fields: { dates: "2024-01-01,2024-01-02" },
      }),
    );
    const texts = getAllByTestId("text").map((el) => el.textContent);
    expect(texts.some((t) => t?.includes("formatted:2024-01-01"))).toBe(true);
  });

  it("renders no date view when dates field is empty", () => {
    const { render } = require("@testing-library/react");
    const { container } = render(
      React.createElement(CuentaDeCobroPdfDocument, { fields: { dates: "" } }),
    );
    const texts = Array.from(
      container.querySelectorAll('[data-testid="text"]'),
    ).map((el) => (el as HTMLElement).textContent);
    expect(texts.some((t) => t?.includes("›"))).toBe(false);
  });
});
