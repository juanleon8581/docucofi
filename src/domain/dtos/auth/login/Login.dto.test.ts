import { describe, expect, it } from "vitest";
import { LoginDTO } from "./Login.dto";

describe("LoginDTO", () => {
  it("should create a new login DTO", () => {
    const t = "password";
    const data = {
      email: "test@test.com",
      password: t,
    };

    const [error, loginDTO] = LoginDTO.create(data);
    expect(error).toBeUndefined();
    expect(loginDTO).toBeInstanceOf(LoginDTO);
    expect(loginDTO?.email).toEqual(data.email);
    expect(loginDTO?.password).toEqual(data.password);
  });

  it("should return an error if data no have email", () => {
    const t = "password";
    const data = {
      password: t,
    };

    const [error, loginDTO] = LoginDTO.create(data);
    expect(error).toBe("Email is required");
    expect(loginDTO).toBeUndefined();
  });

  it("should return an error if data no have password", () => {
    const data = {
      email: "test@test.com",
    };

    const [error, loginDTO] = LoginDTO.create(data);
    expect(error).toBe("Password is required");
    expect(loginDTO).toBeUndefined();
  });
});
