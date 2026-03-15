import { describe, it, expect } from "vitest";
import {
  createLoginSchema,
  createEmailSchema,
  createPasswordSchema,
  createRegisterSchema,
  ValidationTranslations,
} from "./authSchemas";

const t: ValidationTranslations = {
  emailInvalid: "Email inválido",
  emailRequired: "El email es requerido",
  passwordRequired: "La contraseña es requerida",
  fullNameRequired: "El nombre completo es requerido",
  acceptTermsRequired: "Debes aceptar los términos y condiciones",
  passwordsMismatch: "Las contraseñas no coinciden",
};

describe("authSchemas", () => {
  describe("createEmailSchema", () => {
    const emailSchema = createEmailSchema(t);

    it("validates a correct email successfully", () => {
      const result = emailSchema.safeParse("test@example.com");
      expect(result.success).toBe(true);
    });

    it("fails for an empty string", () => {
      const result = emailSchema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(t.emailRequired);
      }
    });

    it("fails for an invalid email", () => {
      const result = emailSchema.safeParse("invalid-email");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(t.emailInvalid);
      }
    });
  });

  describe("createPasswordSchema", () => {
    const passwordSchema = createPasswordSchema(t);

    it("validates a given password successfully", () => {
      const result = passwordSchema.safeParse("Secret123!");
      expect(result.success).toBe(true);
    });

    it("fails for an empty string", () => {
      const result = passwordSchema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(t.passwordRequired);
      }
    });
  });

  describe("createLoginSchema", () => {
    const loginSchema = createLoginSchema(t);

    it("validates a valid set of credentials successfully", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "SecretPassword",
      });
      expect(result.success).toBe(true);
    });

    it("fails when password is missing", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });

    it("fails when email is invalid", () => {
      const result = loginSchema.safeParse({
        email: "invalid",
        password: "SecretPassword",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createRegisterSchema", () => {
    const registerSchema = createRegisterSchema(t);

    it("fails when passwords do not match", () => {
      const result = registerSchema.safeParse({
        fullName: "John Doe",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "DifferentPassword",
        acceptTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const mismatchError = result.error.issues.find(
          (issue) => issue.path[0] === "confirmPassword",
        );
        expect(mismatchError?.message).toBe(t.passwordsMismatch);
      }
    });

    it("fails when acceptTerms is false", () => {
      const result = registerSchema.safeParse({
        fullName: "John Doe",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });

    it("validates a complete valid register payload", () => {
      const result = registerSchema.safeParse({
        fullName: "John Doe",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
        acceptTerms: true,
      });
      expect(result.success).toBe(true);
    });
  });
});
