import { describe, expect, it } from "vitest";
import { RegisterDTO } from "./Register.dto";

describe("RegisterDto", () => {
  it("should create a new login DTO", () => {
    const t = "password";
    const data = {
      email: "test@test.com",
      password: t,
      fullName: "John Doe",
    };

    const [error, registerDTO] = RegisterDTO.create(data);
    expect(error).toBeUndefined();
    expect(registerDTO).toBeInstanceOf(RegisterDTO);
    expect(registerDTO?.email).toEqual(data.email);
    expect(registerDTO?.password).toEqual(data.password);
  });

  it("should return an error if data no have email", () => {
    const t = "password";
    const data = {
      password: t,
    };

    const [error, registerDTO] = RegisterDTO.create(data);
    expect(error).toBe("Email is required");
    expect(registerDTO).toBeUndefined();
  });

  it("should return an error if data no have password", () => {
    const data = {
      email: "test@test.com",
    };

    const [error, registerDTO] = RegisterDTO.create(data);
    expect(error).toBe("Password is required");
    expect(registerDTO).toBeUndefined();
  });

  it("should return an error if data no have fullName", () => {
    const t = "password";
    const data = {
      email: "test@test.com",
      password: t,
    };

    const [error, registerDTO] = RegisterDTO.create(data);
    expect(error).toBe("Full name is required");
    expect(registerDTO).toBeUndefined();
  });
});
