import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthUseCase } from "../AuthUseCase";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { ValidationError } from "../../errors/DomainError";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../../dtos/AuthDTOs";

describe("AuthUseCase", () => {
  let mockAuthRepository: import("vitest").Mocked<IAuthRepository>;
  let useCase: AuthUseCase;

  const mockResponse: AuthResponseDTO = {
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
      getCurrentUser: vi.fn(),
    };

    // Inyectamos el mock al caso de uso
    useCase = new AuthUseCase(mockAuthRepository);
  });

  describe("login", () => {
    it("should throw ValidationError if email is empty", async () => {
      const invalidDto: LoginDTO = { email: "" };

      await expect(useCase.login(invalidDto)).rejects.toThrow(ValidationError);
      await expect(useCase.login(invalidDto)).rejects.toThrow(
        "Email is required",
      );
      expect(mockAuthRepository.signIn).not.toHaveBeenCalled();
    });

    it("should call IAuthRepository.signIn and return user data", async () => {
      const validDto: LoginDTO = {
        email: "test@domain.com",
        password: "mocked-password-for-test",
      };
      mockAuthRepository.signIn.mockResolvedValue(mockResponse);

      const result = await useCase.login(validDto);

      expect(mockAuthRepository.signIn).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("register", () => {
    it("should throw ValidationError if email is empty on registration", async () => {
      const invalidDto: RegisterDTO = { email: "" };

      await expect(useCase.register(invalidDto)).rejects.toThrow(
        ValidationError,
      );
      expect(mockAuthRepository.signUp).not.toHaveBeenCalled();
    });

    it("should call IAuthRepository.signUp on valid input", async () => {
      const validDto: RegisterDTO = { email: "test@domain.com" };
      mockAuthRepository.signUp.mockResolvedValue(mockResponse);

      const result = await useCase.register(validDto);

      expect(mockAuthRepository.signUp).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("logout", () => {
    it("should call IAuthRepository.signOut", async () => {
      mockAuthRepository.signOut.mockResolvedValue();

      await useCase.logout();

      expect(mockAuthRepository.signOut).toHaveBeenCalledOnce();
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
