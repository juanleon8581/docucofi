import { describe, it, expect } from "vitest";
import { SupabaseMapper } from "../SupabaseMapper";
import { AuthenticationError } from "../../../domain/errors/DomainError";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UpdateProfileDTO } from "@/domain/dtos/profile/UpdateProfile.dto";

describe("SupabaseMapper", () => {
  it("should successfully map SupabaseUser to AuthResponseDTO", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-02T00:00:00.000Z",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      role: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user).toBeDefined();
    expect(result.user.id).toBe("mock-uuid");
    expect(result.user.email).toBe("test@example.com");
    expect(result.user.createdAt).toBeInstanceOf(Date);
    expect(result.user.createdAt?.toISOString()).toBe(
      "2023-01-01T00:00:00.000Z",
    );
  });

  it("should map correctly when optional dates are missing", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.id).toBe("mock-uuid");
    expect(result.user.createdAt).toBeUndefined();
    expect(result.user.updatedAt).toBeUndefined();
  });

  it("should map correctly when email is missing", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: undefined,
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.id).toBe("mock-uuid");
    expect(result.user.email).toBe(""); // should fallback to empty string
  });

  it("should map user_metadata full_name to fullName", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: { full_name: "John Doe" },
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.fullName).toBe("John Doe");
  });

  it("should map user_metadata avatar_url to avatarUrl", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: { avatar_url: "https://example.com/avatar.png" },
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.avatarUrl).toBe("https://example.com/avatar.png");
  });

  it("should leave fullName and avatarUrl undefined when user_metadata is empty", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.fullName).toBeUndefined();
    expect(result.user.avatarUrl).toBeUndefined();
  });

  it("should throw AuthenticationError when payload is null", () => {
    expect(() => SupabaseMapper.toDomainResponse(null)).toThrow(
      AuthenticationError,
    );
    expect(() => SupabaseMapper.toDomainResponse(null)).toThrow(
      "User data is missing",
    );
  });

  it("should map user_metadata city, company, companyNit, phone and dni fields", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: {
        city: "Bogotá",
        company: "Acme Corp",
        company_nit: "900.123.456-7",
        phone: "+57 300 123 4567",
        dni: "123456789",
      },
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.city).toBe("Bogotá");
    expect(result.user.company).toBe("Acme Corp");
    expect(result.user.companyNit).toBe("900.123.456-7");
    expect(result.user.phone).toBe("+57 300 123 4567");
    expect(result.user.dni).toBe("123456789");
  });

  it("should leave city, company, companyNit, phone and dni undefined when not in user_metadata", () => {
    const mockSupabaseUser: SupabaseUser = {
      id: "mock-uuid",
      email: "test@example.com",
      created_at: "2023-01-01T00:00:00.000Z",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
    };

    const result = SupabaseMapper.toDomainResponse(mockSupabaseUser);

    expect(result.user.city).toBeUndefined();
    expect(result.user.company).toBeUndefined();
    expect(result.user.companyNit).toBeUndefined();
    expect(result.user.phone).toBeUndefined();
    expect(result.user.dni).toBeUndefined();
  });

  describe("toSupabaseMetadata", () => {
    it("should convert UpdateProfileDTO to Supabase metadata shape", () => {
      const [, dto] = UpdateProfileDTO.create({
        fullName: "John Doe",
        city: "Bogotá",
        company: "Acme Corp",
        companyNit: "900.123.456-7",
        phone: "+57 300 123 4567",
        dni: "123456789",
      });

      const metadata = SupabaseMapper.toSupabaseMetadata(dto!);

      expect(metadata.full_name).toBe("John Doe");
      expect(metadata.city).toBe("Bogotá");
      expect(metadata.company).toBe("Acme Corp");
      expect(metadata.company_nit).toBe("900.123.456-7");
      expect(metadata.phone).toBe("+57 300 123 4567");
      expect(metadata.dni).toBe("123456789");
    });

    it("should set optional fields as undefined when not provided", () => {
      const [, dto] = UpdateProfileDTO.create({ fullName: "Jane Doe" });

      const metadata = SupabaseMapper.toSupabaseMetadata(dto!);

      expect(metadata.full_name).toBe("Jane Doe");
      expect(metadata.city).toBeUndefined();
      expect(metadata.company).toBeUndefined();
      expect(metadata.phone).toBeUndefined();
    });
  });
});
