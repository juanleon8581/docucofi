import { describe, it, expect } from "vitest";
import { User } from "../User";

describe("User", () => {
  it("should create a User with required fields", () => {
    const user = new User("id-1", "test@example.com");

    expect(user.id).toBe("id-1");
    expect(user.email).toBe("test@example.com");
    expect(user.fullName).toBeUndefined();
    expect(user.avatarUrl).toBeUndefined();
    expect(user.createdAt).toBeUndefined();
    expect(user.updatedAt).toBeUndefined();
  });

  it("should create a User with all optional fields", () => {
    const createdAt = new Date("2023-01-01");
    const updatedAt = new Date("2023-06-01");

    const user = new User(
      "id-2",
      "john@example.com",
      "John Doe",
      "https://example.com/avatar.png",
      "Bogotá",
      "Acme Corp",
      "900.123.456-7",
      "+57 300 123 4567",
      "123456789",
      createdAt,
      updatedAt,
    );

    expect(user.id).toBe("id-2");
    expect(user.email).toBe("john@example.com");
    expect(user.fullName).toBe("John Doe");
    expect(user.avatarUrl).toBe("https://example.com/avatar.png");
    expect(user.city).toBe("Bogotá");
    expect(user.company).toBe("Acme Corp");
    expect(user.companyNit).toBe("900.123.456-7");
    expect(user.phone).toBe("+57 300 123 4567");
    expect(user.dni).toBe("123456789");
    expect(user.createdAt).toBe(createdAt);
    expect(user.updatedAt).toBe(updatedAt);
  });

  it("should leave city, company, companyNit, phone and dni undefined when not provided", () => {
    const user = new User("id-3", "test@example.com");

    expect(user.city).toBeUndefined();
    expect(user.company).toBeUndefined();
    expect(user.companyNit).toBeUndefined();
    expect(user.phone).toBeUndefined();
    expect(user.dni).toBeUndefined();
  });
});
