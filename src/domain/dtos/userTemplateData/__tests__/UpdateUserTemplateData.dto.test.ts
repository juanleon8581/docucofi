import { describe, it, expect } from "vitest";
import { UpdateUserTemplateDataDTO } from "../UpdateUserTemplateData.dto";

describe("UpdateUserTemplateDataDTO", () => {
  it("should create a valid DTO with name only", () => {
    const [error, dto] = UpdateUserTemplateDataDTO.create({ name: "New Name" });
    expect(error).toBeUndefined();
    expect(dto).toBeInstanceOf(UpdateUserTemplateDataDTO);
    expect(dto?.name).toBe("New Name");
    expect(dto?.data).toBeUndefined();
  });

  it("should create a valid DTO with data only", () => {
    const [error, dto] = UpdateUserTemplateDataDTO.create({
      data: { field1: "value1" },
    });
    expect(error).toBeUndefined();
    expect(dto).toBeInstanceOf(UpdateUserTemplateDataDTO);
    expect(dto?.name).toBeUndefined();
    expect(dto?.data).toEqual({ field1: "value1" });
  });

  it("should create a valid DTO with both name and data", () => {
    const [error, dto] = UpdateUserTemplateDataDTO.create({
      name: "New Name",
      data: { field1: "value1" },
    });
    expect(error).toBeUndefined();
    expect(dto).toBeInstanceOf(UpdateUserTemplateDataDTO);
    expect(dto?.name).toBe("New Name");
    expect(dto?.data).toEqual({ field1: "value1" });
  });

  it("should return error if neither name nor data is provided", () => {
    const [error, dto] = UpdateUserTemplateDataDTO.create({});
    expect(error).toBe("Name or data is required");
    expect(dto).toBeUndefined();
  });
});
