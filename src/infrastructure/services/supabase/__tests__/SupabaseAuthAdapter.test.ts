import { describe, it, expect, vi, beforeEach } from "vitest";
import { SupabaseAuthAdapter } from "../SupabaseAuthAdapter";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthenticationError } from "../../../../domain/errors/DomainError";
import { LoginDTO } from "@/domain/dtos/auth/login/Login.dto";
import { RegisterDTO } from "@/domain/dtos/auth/register/Register.dto";

describe("SupabaseAuthAdapter", () => {
  let mockSupabaseClient: {
    auth: {
      signInWithPassword: import("vitest").Mock;
      signUp: import("vitest").Mock;
      signOut: import("vitest").Mock;
      getUser: import("vitest").Mock;
      resetPasswordForEmail: import("vitest").Mock;
    };
  };
  let adapter: SupabaseAuthAdapter;

  const mockSupabaseUser = {
    id: "mock-uuid",
    email: "test@example.com",
    created_at: "2023-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    // Definimos el mock del cliente de Supabase
    mockSupabaseClient = {
      auth: {
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        getUser: vi.fn(),
        resetPasswordForEmail: vi.fn(),
      },
    };

    // Inyectamos el mock al adapter
    adapter = new SupabaseAuthAdapter(
      mockSupabaseClient as unknown as SupabaseClient,
    );
  });

  describe("signIn", () => {
    it("should throw AuthenticationError if password is missing", async () => {
      // @ts-expect-error - password is required
      const invalidDto: LoginDTO = { email: "test@domain.com" };

      await expect(adapter.signIn(invalidDto)).rejects.toThrow(
        AuthenticationError,
      );
      expect(mockSupabaseClient.auth.signInWithPassword).not.toHaveBeenCalled();
    });

    it("should throw AuthenticationError if Supabase returns an error", async () => {
      const t = "mocked-password-for-test";
      const validDto: LoginDTO = {
        email: "test@domain.com",
        password: t,
      };
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: "Invalid credentials" },
      });

      await expect(adapter.signIn(validDto)).rejects.toThrow(
        AuthenticationError,
      );
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith(
        validDto,
      );
    });

    it("should return AuthResponseDTO on successful login", async () => {
      const t = "mocked-password-for-test";
      const validDto: LoginDTO = {
        email: "test@domain.com",
        password: t,
      };
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });

      const result = await adapter.signIn(validDto);

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith(
        validDto,
      );
      expect(result.user.id).toBe("mock-uuid");
      expect(result.user.email).toBe("test@example.com");
    });
  });

  describe("signUp", () => {
    it("should throw AuthenticationError if password is missing on registration", async () => {
      // @ts-expect-error - password is required
      const invalidDto: RegisterDTO = { email: "test@domain.com" };

      await expect(adapter.signUp(invalidDto)).rejects.toThrow(
        AuthenticationError,
      );
      expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
    });

    it("should throw AuthenticationError if Supabase sign up returns an error", async () => {
      const t = "mocked-password-for-test";
      const validDto: RegisterDTO = {
        email: "test@domain.com",
        password: t,
        fullName: "John Doe",
      };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: null },
        error: { message: "Email already in use" },
      });

      await expect(adapter.signUp(validDto)).rejects.toThrow(
        AuthenticationError,
      );
    });

    it("should return AuthResponseDTO on valid sign up", async () => {
      const t = "mocked-password-for-test";
      const validDto: RegisterDTO = {
        email: "test@domain.com",
        password: t,
        fullName: "John Doe",
      };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });

      const result = await adapter.signUp(validDto);

      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: validDto.email,
        password: validDto.password,
        options: {
          data: {
            full_name: validDto.fullName,
          },
        },
      });
      expect(result.user.id).toBe("mock-uuid");
    });
  });

  describe("signOut", () => {
    it("should call Supabase signOut and throw if error occurs", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({
        error: { message: "Unexpected server error" },
      });

      await expect(adapter.signOut()).rejects.toThrow(AuthenticationError);
    });

    it("should call Supabase signOut with local scope by default", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });

      await adapter.signOut();

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalledWith({
        scope: "local",
      });
    });

    it("should call Supabase signOut with global scope", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });

      await adapter.signOut("global");

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalledWith({
        scope: "global",
      });
    });

    it("should call Supabase signOut with others scope", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });

      await adapter.signOut("others");

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalledWith({
        scope: "others",
      });
    });
  });

  describe("resetPassword", () => {
    it("should throw AuthenticationError if Supabase resetPassword returns an error", async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: { message: "Email not found" },
      });

      await expect(
        adapter.resetPassword("test@example.com"),
      ).rejects.toThrow(AuthenticationError);
    });

    it("should resolve without error on successful password reset", async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: null,
      });

      await expect(
        adapter.resetPassword("test@example.com"),
      ).resolves.toBeUndefined();
    });
  });

  describe("getCurrentUser", () => {
    it("should throw AuthenticationError if user fetch fails", async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: "No session" },
      });

      expect(() => {
        return adapter.getCurrentUser();
      }).rejects.toThrow(AuthenticationError);
    });

    it("should return null when user is not authenticated and there is no error", async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await adapter.getCurrentUser();

      expect(result).toBeNull();
    });

    it("should return mapped AuthResponseDTO if user is authenticated", async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });

      const result = await adapter.getCurrentUser();

      expect(mockSupabaseClient.auth.getUser).toHaveBeenCalledOnce();
      expect(result?.user.id).toBe("mock-uuid");
    });
  });
});
