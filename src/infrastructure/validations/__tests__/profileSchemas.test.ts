import { describe, it, expect } from "vitest";
import { createUpdateProfileSchema } from "../profileSchemas";

const t = {
  fullNameRequired: "Full name is required",
  phoneInvalid: "Invalid phone number",
};

const schema = createUpdateProfileSchema(t);

describe("createUpdateProfileSchema", () => {
  it("should pass with only fullName", async () => {
    const result = await schema.safeParseAsync({ fullName: "John Doe" });
    expect(result.success).toBe(true);
  });

  it("should pass with all fields provided", async () => {
    const result = await schema.safeParseAsync({
      fullName: "John Doe",
      city: "Bogotá",
      company: "Acme Corp",
      phone: "+57 300 123 4567",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when fullName is missing", async () => {
    const result = await schema.safeParseAsync({ fullName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Full name is required");
    }
  });

  it("should pass when optional fields are empty strings", async () => {
    const result = await schema.safeParseAsync({
      fullName: "John Doe",
      city: "",
      company: "",
      phone: "",
    });
    expect(result.success).toBe(true);
  });

  it("should pass when optional fields are undefined", async () => {
    const result = await schema.safeParseAsync({
      fullName: "John Doe",
      city: undefined,
      company: undefined,
      phone: undefined,
    });
    expect(result.success).toBe(true);
  });

  it("should fail when phone has an invalid format", async () => {
    const result = await schema.safeParseAsync({
      fullName: "John Doe",
      phone: "abc",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid phone number");
    }
  });

  it("should pass with a valid international phone format", async () => {
    const result = await schema.safeParseAsync({
      fullName: "John Doe",
      phone: "+1 (555) 123-4567",
    });
    expect(result.success).toBe(true);
  });
});
