import { describe, it, expect, vi, beforeEach } from "vitest";
import { PrismaUserTemplateDataAdapter } from "../PrismaUserTemplateDataAdapter";
import { PrismaClient } from "@prisma/client";
import { CreateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/CreateUserTemplateData.dto";
import { UpdateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/UpdateUserTemplateData.dto";
import { UserTemplateData } from "@/domain/entities/UserTemplateData";

describe("PrismaUserTemplateDataAdapter", () => {
  let mockPrismaClient: {
    userTemplateData: {
      findMany: import("vitest").Mock;
      findUnique: import("vitest").Mock;
      create: import("vitest").Mock;
      update: import("vitest").Mock;
      delete: import("vitest").Mock;
    };
  };
  let adapter: PrismaUserTemplateDataAdapter;

  const mockPrismaRecord = {
    id: "record-uuid",
    userId: "user-uuid",
    templateId: "template-uuid",
    name: "My Document",
    data: { field1: "value1" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  const expectedDomainRecord = UserTemplateData.fromRaw(mockPrismaRecord);

  beforeEach(() => {
    mockPrismaClient = {
      userTemplateData: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };
    adapter = new PrismaUserTemplateDataAdapter(
      mockPrismaClient as unknown as PrismaClient,
    );
  });

  describe("getAllByUserId", () => {
    it("should return all records for user", async () => {
      mockPrismaClient.userTemplateData.findMany.mockResolvedValue([
        mockPrismaRecord,
      ]);

      const result = await adapter.getAllByUserId("user-uuid");

      expect(mockPrismaClient.userTemplateData.findMany).toHaveBeenCalledWith({
        where: { userId: "user-uuid" },
      });
      expect(result).toEqual([expectedDomainRecord]);
    });

    it("should return empty array when no records", async () => {
      mockPrismaClient.userTemplateData.findMany.mockResolvedValue([]);

      const result = await adapter.getAllByUserId("user-uuid");

      expect(result).toEqual([]);
    });
  });

  describe("getById", () => {
    it("should return mapped domain record when found", async () => {
      mockPrismaClient.userTemplateData.findUnique.mockResolvedValue(
        mockPrismaRecord,
      );

      const result = await adapter.getById("record-uuid");

      expect(
        mockPrismaClient.userTemplateData.findUnique,
      ).toHaveBeenCalledWith({ where: { id: "record-uuid" } });
      expect(result).toEqual(expectedDomainRecord);
    });

    it("should return null when record not found", async () => {
      mockPrismaClient.userTemplateData.findUnique.mockResolvedValue(null);

      const result = await adapter.getById("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create and return new domain record", async () => {
      const [, createDto] = CreateUserTemplateDataDTO.create({
        userId: "user-uuid",
        templateId: "template-uuid",
        name: "My Document",
        data: { field1: "value1" },
      });
      mockPrismaClient.userTemplateData.create.mockResolvedValue(
        mockPrismaRecord,
      );

      const result = await adapter.create(createDto!);

      expect(mockPrismaClient.userTemplateData.create).toHaveBeenCalledWith({
        data: {
          userId: createDto!.userId,
          templateId: createDto!.templateId,
          name: createDto!.name,
          data: createDto!.data,
        },
      });
      expect(result).toEqual(expectedDomainRecord);
    });
  });

  describe("update", () => {
    it("should update only name when data is not provided", async () => {
      const [, updateDto] = UpdateUserTemplateDataDTO.create({
        name: "Updated Name",
      });
      const updatedRecord = { ...mockPrismaRecord, name: "Updated Name" };
      mockPrismaClient.userTemplateData.update.mockResolvedValue(updatedRecord);

      const result = await adapter.update("record-uuid", updateDto!);

      expect(mockPrismaClient.userTemplateData.update).toHaveBeenCalledWith({
        where: { id: "record-uuid" },
        data: { name: "Updated Name" },
      });
      expect(result.name).toBe("Updated Name");
    });

    it("should update only data when name is not provided", async () => {
      const [, updateDto] = UpdateUserTemplateDataDTO.create({
        data: { field1: "new-value" },
      });
      const updatedRecord = {
        ...mockPrismaRecord,
        data: { field1: "new-value" },
      };
      mockPrismaClient.userTemplateData.update.mockResolvedValue(updatedRecord);

      const result = await adapter.update("record-uuid", updateDto!);

      expect(mockPrismaClient.userTemplateData.update).toHaveBeenCalledWith({
        where: { id: "record-uuid" },
        data: { data: { field1: "new-value" } },
      });
      expect(result.data).toEqual({ field1: "new-value" });
    });

    it("should update both name and data when both provided", async () => {
      const [, updateDto] = UpdateUserTemplateDataDTO.create({
        name: "New Name",
        data: { field1: "new" },
      });
      const updatedRecord = {
        ...mockPrismaRecord,
        name: "New Name",
        data: { field1: "new" },
      };
      mockPrismaClient.userTemplateData.update.mockResolvedValue(updatedRecord);

      await adapter.update("record-uuid", updateDto!);

      expect(mockPrismaClient.userTemplateData.update).toHaveBeenCalledWith({
        where: { id: "record-uuid" },
        data: { name: "New Name", data: { field1: "new" } },
      });
    });
  });

  describe("delete", () => {
    it("should delete record by id", async () => {
      mockPrismaClient.userTemplateData.delete.mockResolvedValue(
        mockPrismaRecord,
      );

      await adapter.delete("record-uuid");

      expect(mockPrismaClient.userTemplateData.delete).toHaveBeenCalledWith({
        where: { id: "record-uuid" },
      });
    });
  });
});
