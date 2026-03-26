import { describe, it, expect } from "vitest";
import { ValidationMessages } from "../validation.messages";

describe("ValidationMessages", () => {
  it("should return a REQUIRED_FIELD message with the field name", () => {
    expect(ValidationMessages.REQUIRED_FIELD("email")).toBe(
      "email is required",
    );
  });

  it("should return an INVALID_FORMAT message with the field name", () => {
    expect(ValidationMessages.INVALID_FORMAT("email")).toBe(
      "email format is not valid",
    );
  });

  it("should return a TOO_SHORT message with the field name and min limit", () => {
    expect(ValidationMessages.TOO_SHORT("password", 8)).toBe(
      "password must be at least 8 characters",
    );
  });
});
