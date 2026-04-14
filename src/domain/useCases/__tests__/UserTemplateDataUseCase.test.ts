import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserTemplateDataUseCase } from "../UserTemplateDataUseCase";
import { UserTemplateDataRepository } from "@/domain/repositories/IUserTemplateDataRepository";
import { CreateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/CreateUserTemplateData.dto";
import { UpdateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/UpdateUserTemplateData.dto";
import { UserTemplateData } from "@/domain/entities/UserTemplateData";
import { ValidationError } from "@/domain/errors/DomainError";

describe("UserTemplateDataUseCase", () => {
  let mockRepository: import("vitest").Mocked<UserTemplateDataRepository>;
  let useCase: UserTemplateDataUseCase;

  const mockRecord = UserTemplateData.fromRaw({
    id: "record-uuid",
    userId: "user-uuid",
    templateId: "template-uuid",
    name: "My Document",
    data: { field1: "value1" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  });

  beforeEach(() => {
    mockRepository = {
      getAllByUserId: vi.fn(),
      getById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new UserTemplateDataUseCase(mockRepository);
  });

  describe("getAllByUserId", () => {
    it("should return all records for a user", async () => {
      mockRepository.getAllByUserId.mockResolvedValue([mockRecord]);

      const result = await useCase.getAllByUserId("user-uuid");

      expect(mockRepository.getAllByUserId).toHaveBeenCalledWith("user-uuid");
      expect(result).toEqual([mockRecord]);
    });

    it("should return empty array when user has no records", async () => {
      mockRepository.getAllByUserId.mockResolvedValue([]);

      const result = await useCase.getAllByUserId("user-uuid");

      expect(result).toEqual([]);
    });
  });

  describe("getById", () => {
    it("should return record when found", async () => {
      mockRepository.getById.mockResolvedValue(mockRecord);

      const result = await useCase.getById("record-uuid");

      expect(mockRepository.getById).toHaveBeenCalledWith("record-uuid");
      expect(result).toEqual(mockRecord);
    });

    it("should return null when not found", async () => {
      mockRepository.getById.mockResolvedValue(null);

      const result = await useCase.getById("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should throw ValidationError if name is empty", async () => {
      const invalidDto = { name: "" } as unknown as CreateUserTemplateDataDTO;

      await expect(useCase.create(invalidDto)).rejects.toThrow(ValidationError);
      await expect(useCase.create(invalidDto)).rejects.toThrow(
        "Name is required",
      );
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it("should create and return new record on valid input", async () => {
      const [, validDto] = CreateUserTemplateDataDTO.create({
        userId: "user-uuid",
        templateId: "template-uuid",
        name: "My Document",
        data: { field1: "value1" },
      });
      mockRepository.create.mockResolvedValue(mockRecord);

      const result = await useCase.create(validDto!);

      expect(mockRepository.create).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockRecord);
    });
  });

  describe("update", () => {
    it("should update and return the updated record", async () => {
      const [, updateDto] = UpdateUserTemplateDataDTO.create({
        name: "Updated Name",
      });
      const updatedRecord = { ...mockRecord, name: "Updated Name" };
      mockRepository.update.mockResolvedValue(updatedRecord);

      const result = await useCase.update("record-uuid", updateDto!);

      expect(mockRepository.update).toHaveBeenCalledWith(
        "record-uuid",
        updateDto,
      );
      expect(result).toEqual(updatedRecord);
    });
  });

  describe("delete", () => {
    it("should delete record by id", async () => {
      mockRepository.delete.mockResolvedValue();

      await useCase.delete("record-uuid");

      expect(mockRepository.delete).toHaveBeenCalledWith("record-uuid");
    });
  });
});
