import { describe, it, expect } from "vitest";
import { generateTemplateSchema } from "../templateSchemas";
import { TemplateFieldData } from "@/domain/entities/Template";

describe("generateTemplateSchema", () => {
  const baseField: TemplateFieldData = {
    name: "fieldName",
    label: "Field Label",
    type: "text",
    defaultValue: "",
    placeholder: null,
    options: [],
    dateMode: null,
    isDisabled: false,
    isAuto: false,
  };

  describe("text field", () => {
    it("should accept non-empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, type: "text" },
      ]);
      expect(schema.safeParse({ fieldName: "value" }).success).toBe(true);
    });

    it("should reject empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, type: "text" },
      ]);
      expect(schema.safeParse({ fieldName: "" }).success).toBe(false);
    });
  });

  describe("textarea field", () => {
    it("should accept non-empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "desc", type: "textarea" },
      ]);
      expect(schema.safeParse({ desc: "some text" }).success).toBe(true);
    });

    it("should reject empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "desc", type: "textarea" },
      ]);
      expect(schema.safeParse({ desc: "" }).success).toBe(false);
    });
  });

  describe("number field", () => {
    it("should accept valid integer string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(schema.safeParse({ amount: "100" }).success).toBe(true);
    });

    it("should accept valid decimal string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(schema.safeParse({ amount: "1.50" }).success).toBe(true);
    });

    it("should reject non-numeric string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(schema.safeParse({ amount: "abc" }).success).toBe(false);
    });

    it("should reject empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(schema.safeParse({ amount: "" }).success).toBe(false);
    });
  });

  describe("date field", () => {
    it("should accept non-empty date string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "fecha", type: "date", dateMode: "single" },
      ]);
      expect(schema.safeParse({ fecha: "2024-01-01" }).success).toBe(true);
    });

    it("should reject empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "fecha", type: "date", dateMode: "single" },
      ]);
      expect(schema.safeParse({ fecha: "" }).success).toBe(false);
    });
  });

  describe("select field", () => {
    it("should accept valid enum option", () => {
      const schema = generateTemplateSchema([
        {
          ...baseField,
          name: "category",
          type: "select",
          options: ["option1", "option2"],
        },
      ]);
      expect(schema.safeParse({ category: "option1" }).success).toBe(true);
      expect(schema.safeParse({ category: "option2" }).success).toBe(true);
    });

    it("should reject value not in options", () => {
      const schema = generateTemplateSchema([
        {
          ...baseField,
          name: "category",
          type: "select",
          options: ["option1", "option2"],
        },
      ]);
      expect(schema.safeParse({ category: "option3" }).success).toBe(false);
    });

    it("should use string.min(1) when options list is empty", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "category", type: "select", options: [] },
      ]);
      expect(schema.safeParse({ category: "anything" }).success).toBe(true);
      expect(schema.safeParse({ category: "" }).success).toBe(false);
    });
  });

  describe("disabled field", () => {
    it("should be optional and accept empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, isDisabled: true },
      ]);
      expect(schema.safeParse({ fieldName: "" }).success).toBe(true);
      expect(schema.safeParse({ fieldName: "value" }).success).toBe(true);
    });

    it("should be optional and accept missing key", () => {
      const schema = generateTemplateSchema([
        { ...baseField, isDisabled: true },
      ]);
      expect(schema.safeParse({}).success).toBe(true);
    });
  });

  describe("auto field", () => {
    it("should be optional and accept empty string", () => {
      const schema = generateTemplateSchema([
        { ...baseField, isAuto: true },
      ]);
      expect(schema.safeParse({ fieldName: "" }).success).toBe(true);
    });

    it("should be optional and accept missing key", () => {
      const schema = generateTemplateSchema([
        { ...baseField, isAuto: true },
      ]);
      expect(schema.safeParse({}).success).toBe(true);
    });
  });

  describe("multiple fields", () => {
    it("should validate all fields in combined schema", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "name", type: "text" },
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(
        schema.safeParse({ name: "John", amount: "100" }).success,
      ).toBe(true);
    });

    it("should fail if any required field is invalid", () => {
      const schema = generateTemplateSchema([
        { ...baseField, name: "name", type: "text" },
        { ...baseField, name: "amount", type: "number" },
      ]);
      expect(
        schema.safeParse({ name: "", amount: "100" }).success,
      ).toBe(false);
      expect(
        schema.safeParse({ name: "John", amount: "abc" }).success,
      ).toBe(false);
    });
  });
});
