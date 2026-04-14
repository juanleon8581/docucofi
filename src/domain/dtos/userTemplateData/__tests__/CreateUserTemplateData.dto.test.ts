import { describe, it, expect } from "vitest";
import { CreateUserTemplateDataDTO } from "../CreateUserTemplateData.dto";

describe("CreateUserTemplateDataDTO", () => {
  const validData = {
    userId: "user-uuid",
    templateId: "template-uuid",
    name: "My Document",
    data: { field1: "value1" },
  };

  it("should create a valid DTO", () => {
    const [error, dto] = CreateUserTemplateDataDTO.create(validData);
    expect(error).toBeUndefined();
    expect(dto).toBeInstanceOf(CreateUserTemplateDataDTO);
    expect(dto?.userId).toBe("user-uuid");
    expect(dto?.templateId).toBe("template-uuid");
    expect(dto?.name).toBe("My Document");
    expect(dto?.data).toEqual({ field1: "value1" });
  });

  it("should return error if userId is missing", () => {
    const [error, dto] = CreateUserTemplateDataDTO.create({
      ...validData,
      userId: "",
    });
    expect(error).toBe("User is required");
    expect(dto).toBeUndefined();
  });

  it("should return error if templateId is missing", () => {
    const [error, dto] = CreateUserTemplateDataDTO.create({
      ...validData,
      templateId: "",
    });
    expect(error).toBe("Template is required");
    expect(dto).toBeUndefined();
  });

  it("should return error if name is missing", () => {
    const [error, dto] = CreateUserTemplateDataDTO.create({
      ...validData,
      name: "",
    });
    expect(error).toBe("Name is required");
    expect(dto).toBeUndefined();
  });

  it("should return error if data is missing", () => {
    const [error, dto] = CreateUserTemplateDataDTO.create({
      ...validData,
      data: null,
    });
    expect(error).toBe("Data is required");
    expect(dto).toBeUndefined();
  });
});
