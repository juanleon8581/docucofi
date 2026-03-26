import { describe, it, expect, beforeEach } from "vitest";
import { registerTemplate, getTemplate, getAllTemplates } from "../registry";
import type { ITemplateMetadata } from "../registry";

const mockTemplate: ITemplateMetadata = {
  slug: "test-template",
  category: "business",
  displayNameKey: "templates.test-template.name",
  descriptionKey: "templates.test-template.description",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (() => null) as any,
  fields: [],
};

describe("template registry", () => {
  beforeEach(() => {
    // Register a fresh template for each test
    registerTemplate(mockTemplate);
  });

  describe("registerTemplate / getTemplate", () => {
    it("should register and retrieve a template by slug", () => {
      const result = getTemplate("test-template");
      expect(result).toBeDefined();
      expect(result?.slug).toBe("test-template");
      expect(result?.category).toBe("business");
    });

    it("should return undefined for an unknown slug", () => {
      const result = getTemplate("non-existent");
      expect(result).toBeUndefined();
    });
  });

  describe("getAllTemplates", () => {
    it("should return an array that includes the registered template", () => {
      const all = getAllTemplates();
      expect(Array.isArray(all)).toBe(true);
      const found = all.find((t) => t.slug === "test-template");
      expect(found).toBeDefined();
    });
  });
});
