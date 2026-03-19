import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthUseCase } from "../AuthUseCase";
import { ValidationError } from "../../errors/DomainError";
import { AuthRepository } from "@/domain/repositories/IAuthRepository";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { LoginDTO } from "@/domain/dtos/auth/login/Login.dto";
import { RegisterDTO } from "@/domain/dtos/auth/register/Register.dto";

describe("AuthUseCase", () => {
  let mockAuthRepository: import("vitest").Mocked<AuthRepository>;
  let useCase: AuthUseCase;

  const mockResponse: IAuthResponse = {
    user: {
      id: "mock-user-id",
      email: "test@domain.com",
      createdAt: new Date(),
    },
  };

  beforeEach(() => {
    // Definimos el mock del puerto (IAuthRepository)
    mockAuthRepository = {
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
      getCurrentUser: vi.fn(),
    };

    // Inyectamos el mock al caso de uso
    useCase = new AuthUseCase(mockAuthRepository);
  });

  describe("login", () => {
    it("should throw ValidationError if email is empty", async () => {
      // @ts-expect-error - password is required
      const invalidDto: LoginDTO = { email: "" };

      await expect(useCase.login(invalidDto)).rejects.toThrow(ValidationError);
      await expect(useCase.login(invalidDto)).rejects.toThrow(
        "Email is required",
      );
      expect(mockAuthRepository.signIn).not.toHaveBeenCalled();
    });

    it("should call IAuthRepository.signIn and return user data", async () => {
      const t = "mocked-password-for-test";
      const validDto: LoginDTO = {
        email: "test@domain.com",
        password: t,
      };
      mockAuthRepository.signIn.mockResolvedValue(mockResponse);

      const result = await useCase.login(validDto);

      expect(mockAuthRepository.signIn).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("register", () => {
    it("should throw ValidationError if email is empty on registration", async () => {
      // @ts-expect-error - password is required
      const invalidDto: RegisterDTO = { email: "" };

      await expect(useCase.register(invalidDto)).rejects.toThrow(
        ValidationError,
      );
      expect(mockAuthRepository.signUp).not.toHaveBeenCalled();
    });

    it("should call IAuthRepository.signUp on valid input", async () => {
      // @ts-expect-error - password is required
      const validDto: RegisterDTO = { email: "test@domain.com" };
      mockAuthRepository.signUp.mockResolvedValue(mockResponse);

      const result = await useCase.register(validDto);

      expect(mockAuthRepository.signUp).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("logout", () => {
    it("should call IAuthRepository.signOut without scope by default", async () => {
      mockAuthRepository.signOut.mockResolvedValue();

      await useCase.logout();

      expect(mockAuthRepository.signOut).toHaveBeenCalledWith(undefined);
    });

    it("should pass scope to IAuthRepository.signOut", async () => {
      mockAuthRepository.signOut.mockResolvedValue();

      await useCase.logout("global");

      expect(mockAuthRepository.signOut).toHaveBeenCalledWith("global");
    });
  });

  describe("getSessionUser", () => {
    it("should return the current user mapped by the Repository", async () => {
      mockAuthRepository.getCurrentUser.mockResolvedValue(mockResponse);

      const result = await useCase.getSessionUser();

      expect(mockAuthRepository.getCurrentUser).toHaveBeenCalledOnce();
      expect(result).toEqual(mockResponse);
    });

    it("should return null if there is no user session", async () => {
      mockAuthRepository.getCurrentUser.mockResolvedValue(null);

      const result = await useCase.getSessionUser();

      expect(mockAuthRepository.getCurrentUser).toHaveBeenCalledOnce();
      expect(result).toBeNull();
    });
  });
});
