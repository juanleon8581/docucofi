import { describe, it, expect } from "vitest";
import { mapTemplateFields } from "../TemplateFieldMapper";
import type { TemplateFieldData } from "@/domain/entities/Template";

const baseField: TemplateFieldData = {
  name: "city",
  label: "Ciudad",
  type: "text",
  defaultValue: "Bogotá",
  placeholder: null,
  options: [],
  dateMode: null,
  isDisabled: false,
  isAuto: false,
};

describe("mapTemplateFields", () => {
  it("should map a basic field with no optional properties", () => {
    const result = mapTemplateFields([baseField]);

    expect(result).toEqual([
      {
        name: "city",
        label: "Ciudad",
        type: "text",
        defaultValue: "Bogotá",
      },
    ]);
    expect(result[0].placeholder).toBeUndefined();
    expect(result[0].options).toBeUndefined();
    expect(result[0].dateMode).toBeUndefined();
    expect(result[0].disabledField).toBeUndefined();
  });

  it("should include placeholder when not null", () => {
    const field: TemplateFieldData = { ...baseField, placeholder: "Ej: Bogotá" };
    const [result] = mapTemplateFields([field]);
    expect(result.placeholder).toBe("Ej: Bogotá");
  });

  it("should not include placeholder when null", () => {
    const [result] = mapTemplateFields([{ ...baseField, placeholder: null }]);
    expect(result.placeholder).toBeUndefined();
  });

  it("should include options when array is non-empty", () => {
    const field: TemplateFieldData = {
      ...baseField,
      type: "select",
      options: ["opt1", "opt2"],
    };
    const [result] = mapTemplateFields([field]);
    expect(result.options).toEqual(["opt1", "opt2"]);
  });

  it("should not include options when array is empty", () => {
    const [result] = mapTemplateFields([{ ...baseField, options: [] }]);
    expect(result.options).toBeUndefined();
  });

  it("should include dateMode when not null", () => {
    const field: TemplateFieldData = {
      ...baseField,
      type: "date",
      dateMode: "single",
    };
    const [result] = mapTemplateFields([field]);
    expect(result.dateMode).toBe("single");
  });

  it("should not include dateMode when null", () => {
    const [result] = mapTemplateFields([{ ...baseField, dateMode: null }]);
    expect(result.dateMode).toBeUndefined();
  });

  it("should set disabledField when isDisabled is true", () => {
    const [result] = mapTemplateFields([{ ...baseField, isDisabled: true }]);
    expect(result.disabledField).toBe(true);
  });

  it("should set disabledField when isAuto is true", () => {
    const [result] = mapTemplateFields([{ ...baseField, isAuto: true }]);
    expect(result.disabledField).toBe(true);
  });

  it("should not set disabledField when both isDisabled and isAuto are false", () => {
    const [result] = mapTemplateFields([
      { ...baseField, isDisabled: false, isAuto: false },
    ]);
    expect(result.disabledField).toBeUndefined();
  });

  it("should map multiple fields correctly", () => {
    const fields: TemplateFieldData[] = [
      baseField,
      { ...baseField, name: "amount", label: "Valor", type: "number" },
    ];
    const result = mapTemplateFields(fields);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("city");
    expect(result[1].name).toBe("amount");
  });

  it("should return empty array for empty input", () => {
    expect(mapTemplateFields([])).toEqual([]);
  });
});
