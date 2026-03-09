import { ValidationAdapter, InferValidationType } from "../adapters/ZodAdapter";

export const emailSchema = ValidationAdapter.email(
  "Email inválido",
  "El email es requerido",
);

export const passwordSchema = ValidationAdapter.string(
  "La contraseña es requerida",
);

export const loginSchema = ValidationAdapter.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = InferValidationType<typeof loginSchema>;

export const registerSchema = ValidationAdapter.object({
  fullName: ValidationAdapter.string("El nombre completo es requerido"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  acceptTerms: ValidationAdapter.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormValues = InferValidationType<typeof registerSchema>;
