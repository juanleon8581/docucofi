import { describe, it, expect, vi, beforeEach } from "vitest";
import { PrismaTemplateAdapter } from "../PrismaTemplateAdapter";
import { PrismaClient } from "@prisma/client";
import { Template } from "@/domain/entities/Template";

describe("PrismaTemplateAdapter", () => {
  let mockPrismaClient: {
    template: {
      findUnique: import("vitest").Mock;
      findMany: import("vitest").Mock;
    };
  };
  let adapter: PrismaTemplateAdapter;

  const mockPrismaTemplate = {
    id: "uuid-1",
    slug: "test-template",
    category: "business" as const,
    displayNameKey: "templates.test.name",
    descriptionKey: "templates.test.description",
    fields: [
      {
        name: "field1",
        label: "Field 1",
        type: "text",
        defaultValue: "",
        placeholder: null,
        options: [],
        dateMode: null,
        isDisabled: false,
        isAuto: false,
      },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  beforeEach(() => {
    mockPrismaClient = {
      template: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
      },
    };
    adapter = new PrismaTemplateAdapter(
      mockPrismaClient as unknown as PrismaClient,
    );
  });

  describe("getBySlug", () => {
    it("should return mapped domain template when found", async () => {
      mockPrismaClient.template.findUnique.mockResolvedValue(
        mockPrismaTemplate,
      );

      const result = await adapter.getBySlug("test-template");

      expect(mockPrismaClient.template.findUnique).toHaveBeenCalledWith({
        where: { slug: "test-template" },
      });
      expect(result).toEqual(Template.fromRaw(mockPrismaTemplate));
    });

    it("should return null when template not found", async () => {
      mockPrismaClient.template.findUnique.mockResolvedValue(null);

      const result = await adapter.getBySlug("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("getAll", () => {
    it("should return all mapped domain templates", async () => {
      mockPrismaClient.template.findMany.mockResolvedValue([
        mockPrismaTemplate,
      ]);

      const result = await adapter.getAll();

      expect(mockPrismaClient.template.findMany).toHaveBeenCalledOnce();
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("test-template");
      expect(result[0].category).toBe("business");
    });

    it("should return empty array when no templates exist", async () => {
      mockPrismaClient.template.findMany.mockResolvedValue([]);

      const result = await adapter.getAll();

      expect(result).toEqual([]);
    });
  });
});
