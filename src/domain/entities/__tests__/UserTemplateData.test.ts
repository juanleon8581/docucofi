import { describe, it, expect } from "vitest";
import { UserTemplateData } from "../UserTemplateData";

describe("UserTemplateData", () => {
  const rawRecord = {
    id: "record-uuid",
    userId: "user-uuid",
    templateId: "template-uuid",
    name: "My Document",
    data: { field1: "value1" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  it("should create a UserTemplateData instance from raw data", () => {
    const record = UserTemplateData.fromRaw(rawRecord);

    expect(record).toBeInstanceOf(UserTemplateData);
    expect(record.id).toBe("record-uuid");
    expect(record.userId).toBe("user-uuid");
    expect(record.templateId).toBe("template-uuid");
    expect(record.name).toBe("My Document");
    expect(record.data).toEqual({ field1: "value1" });
    expect(record.createdAt).toBe(rawRecord.createdAt);
    expect(record.updatedAt).toBe(rawRecord.updatedAt);
  });
});
