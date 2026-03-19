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
      createdAt,
      updatedAt,
    );

    expect(user.id).toBe("id-2");
    expect(user.email).toBe("john@example.com");
    expect(user.fullName).toBe("John Doe");
    expect(user.avatarUrl).toBe("https://example.com/avatar.png");
    expect(user.createdAt).toBe(createdAt);
    expect(user.updatedAt).toBe(updatedAt);
  });
});
