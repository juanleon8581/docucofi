import { describe, it, expect } from "vitest";
import { UpdateProfileDTO } from "../UpdateProfile.dto";

describe("UpdateProfileDTO", () => {
  describe("create", () => {
    it("should return an error if fullName is missing", () => {
      const [error, dto] = UpdateProfileDTO.create({});

      expect(error).toBe("Full name is required");
      expect(dto).toBeUndefined();
    });

    it("should return an error if fullName is empty string", () => {
      const [error, dto] = UpdateProfileDTO.create({ fullName: "" });

      expect(error).toBe("Full name is required");
      expect(dto).toBeUndefined();
    });

    it("should create a DTO with only fullName", () => {
      const [error, dto] = UpdateProfileDTO.create({ fullName: "John Doe" });

      expect(error).toBeUndefined();
      expect(dto?.fullName).toBe("John Doe");
      expect(dto?.city).toBeUndefined();
      expect(dto?.company).toBeUndefined();
      expect(dto?.phone).toBeUndefined();
    });

    it("should create a DTO with all optional fields", () => {
      const [error, dto] = UpdateProfileDTO.create({
        fullName: "John Doe",
        city: "Bogotá",
        company: "Acme Corp",
        companyNit: "900.123.456-7",
        phone: "+57 300 123 4567",
        dni: "123456789",
      });

      expect(error).toBeUndefined();
      expect(dto?.fullName).toBe("John Doe");
      expect(dto?.city).toBe("Bogotá");
      expect(dto?.company).toBe("Acme Corp");
      expect(dto?.companyNit).toBe("900.123.456-7");
      expect(dto?.phone).toBe("+57 300 123 4567");
      expect(dto?.dni).toBe("123456789");
    });
  });
});
