import { describe, it, expect, vi, beforeEach } from "vitest";
import { TemplateUseCase } from "../TemplateUseCase";
import { TemplateRepository } from "@/domain/repositories/ITemplateRepository";
import { Template } from "@/domain/entities/Template";

describe("TemplateUseCase", () => {
  let mockRepository: import("vitest").Mocked<TemplateRepository>;
  let useCase: TemplateUseCase;

  const mockTemplate = Template.fromRaw({
    id: "uuid-1",
    slug: "test-template",
    category: "business",
    displayNameKey: "templates.test.name",
    descriptionKey: "templates.test.description",
    fields: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  });

  beforeEach(() => {
    mockRepository = {
      getBySlug: vi.fn(),
      getAll: vi.fn(),
    };
    useCase = new TemplateUseCase(mockRepository);
  });

  describe("getBySlug", () => {
    it("should return template when found", async () => {
      mockRepository.getBySlug.mockResolvedValue(mockTemplate);

      const result = await useCase.getBySlug("test-template");

      expect(mockRepository.getBySlug).toHaveBeenCalledWith("test-template");
      expect(result).toEqual(mockTemplate);
    });

    it("should return null when not found", async () => {
      mockRepository.getBySlug.mockResolvedValue(null);

      const result = await useCase.getBySlug("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("getAll", () => {
    it("should return all templates", async () => {
      mockRepository.getAll.mockResolvedValue([mockTemplate]);

      const result = await useCase.getAll();

      expect(mockRepository.getAll).toHaveBeenCalledOnce();
      expect(result).toEqual([mockTemplate]);
    });

    it("should return empty array when no templates exist", async () => {
      mockRepository.getAll.mockResolvedValue([]);

      const result = await useCase.getAll();

      expect(result).toEqual([]);
    });
  });
});
