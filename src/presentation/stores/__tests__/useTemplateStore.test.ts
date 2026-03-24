import { describe, it, expect, beforeEach } from "vitest";
import { useTemplateStore } from "../useTemplateStore";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";

const testFields: TemplateFieldDefinition[] = [
  { name: "ciudad", label: "Ciudad", type: "text", defaultValue: "CIUDAD" },
  { name: "valor", label: "Valor", type: "number", defaultValue: "100" },
];

describe("useTemplateStore", () => {
  beforeEach(() => {
    useTemplateStore.setState({ fields: {} });
  });

  describe("resetFields", () => {
    it("should initialize fields from definitions", () => {
      useTemplateStore.getState().resetFields(testFields);
      const { fields } = useTemplateStore.getState();
      expect(fields["ciudad"]).toBe("CIUDAD");
      expect(fields["valor"]).toBe("100");
    });

    it("should overwrite existing fields", () => {
      useTemplateStore.setState({ fields: { ciudad: "OLD" } });
      useTemplateStore.getState().resetFields(testFields);
      expect(useTemplateStore.getState().fields["ciudad"]).toBe("CIUDAD");
    });
  });

  describe("setFieldValue", () => {
    it("should update a single field value", () => {
      useTemplateStore.getState().resetFields(testFields);
      useTemplateStore.getState().setFieldValue("ciudad", "Bogotá");
      expect(useTemplateStore.getState().fields["ciudad"]).toBe("Bogotá");
    });

    it("should not affect other fields", () => {
      useTemplateStore.getState().resetFields(testFields);
      useTemplateStore.getState().setFieldValue("ciudad", "Bogotá");
      expect(useTemplateStore.getState().fields["valor"]).toBe("100");
    });

    it("should add a new key if it does not exist", () => {
      useTemplateStore.getState().setFieldValue("nuevo", "X");
      expect(useTemplateStore.getState().fields["nuevo"]).toBe("X");
    });
  });

});
