import { ValidationAdapter, InferValidationType } from "../adapters/ZodAdapter";
import type { Dictionary } from "@/infrastructure/i18n/dictionaries";

export type ValidationTranslations = Dictionary["validation"];

// ── Factory functions ──────────────────────────────────────────────────────

export function createEmailSchema(t: ValidationTranslations) {
  return ValidationAdapter.email(t.emailInvalid, t.emailRequired);
}

export function createPasswordSchema(t: ValidationTranslations) {
  return ValidationAdapter.string(t.passwordRequired);
}

export function createLoginSchema(t: ValidationTranslations) {
  return ValidationAdapter.object({
    email: createEmailSchema(t),
    password: createPasswordSchema(t),
  });
}

export function createRegisterSchema(t: ValidationTranslations) {
  return ValidationAdapter.object({
    fullName: ValidationAdapter.string(t.fullNameRequired),
    email: createEmailSchema(t),
    password: createPasswordSchema(t),
    confirmPassword: createPasswordSchema(t),
    acceptTerms: ValidationAdapter.boolean().refine((val) => val === true, {
      message: t.acceptTermsRequired,
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t.passwordsMismatch,
    path: ["confirmPassword"],
  });
}

export function createForgotPasswordSchema(t: ValidationTranslations) {
  return ValidationAdapter.object({
    email: createEmailSchema(t),
  });
}

// ── Static type inference helpers ─────────────────────────────────────────
// Using empty strings as placeholders solely for type inference — not used at runtime.

const _typeRef: ValidationTranslations = {
  emailInvalid: "",
  emailRequired: "",
  passwordRequired: "",
  fullNameRequired: "",
  acceptTermsRequired: "",
  passwordsMismatch: "",
};

export type LoginFormValues = InferValidationType<
  ReturnType<typeof createLoginSchema>
>;
export type RegisterFormValues = InferValidationType<
  ReturnType<typeof createRegisterSchema>
>;
export type ForgotPasswordFormValues = InferValidationType<
  ReturnType<typeof createForgotPasswordSchema>
>;

// ── Compatibility aliases for tests ───────────────────────────────────────
// These are only valid for type-checking purposes; tests that assert error
// messages must be updated to use the factory functions with explicit translations.
export const emailSchema = createEmailSchema(_typeRef);
export const passwordSchema = createPasswordSchema(_typeRef);
export const loginSchema = createLoginSchema(_typeRef);
export const registerSchema = createRegisterSchema(_typeRef);
export const forgotPasswordSchema = createForgotPasswordSchema(_typeRef);
