import { describe, it, expect } from "vitest";
import {
  DomainError,
  AuthenticationError,
  ValidationError,
} from "../DomainError";

describe("DomainError", () => {
  it("should correctly inherit from Error and preserve prototype", () => {
    const error = new DomainError("Test error message", "TEST_CODE");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(DomainError);
    expect(error.message).toBe("Test error message");
    expect(error.code).toBe("TEST_CODE");
    expect(error.name).toBe("DomainError");
  });

  it("should store details when provided", () => {
    const details = { resource: "User" };
    const error = new DomainError("Not found", "NOT_FOUND", details);

    expect(error.details).toEqual(details);
  });
});

describe("AuthenticationError", () => {
  it("should create an error with AUTHENTICATION_ERROR code implicitly", () => {
    const error = new AuthenticationError("Invalid credentials");

    expect(error).toBeInstanceOf(DomainError);
    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error.code).toBe("AUTHENTICATION_ERROR");
    expect(error.message).toBe("Invalid credentials");
  });
});

describe("ValidationError", () => {
  it("should create an error with VALIDATION_ERROR code implicitly", () => {
    const details = { field: "email", reason: "is required" };
    const error = new ValidationError("Bad Input", details);

    expect(error).toBeInstanceOf(DomainError);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.message).toBe("Bad Input");
    expect(error.details).toEqual(details);
  });
});
