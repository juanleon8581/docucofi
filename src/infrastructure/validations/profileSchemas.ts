import { ValidationAdapter, InferValidationType } from "../adapters/ZodAdapter";
import type { Dictionary } from "@/infrastructure/i18n/dictionaries";

export type ProfileValidationTranslations = Pick<
  Dictionary["validation"],
  "fullNameRequired" | "phoneInvalid"
>;

export function createUpdateProfileSchema(t: ProfileValidationTranslations) {
  return ValidationAdapter.object({
    fullName: ValidationAdapter.string(t.fullNameRequired),
    city: ValidationAdapter.optionalString(),
    company: ValidationAdapter.optionalString(),
    companyNit: ValidationAdapter.optionalString(),
    phone: ValidationAdapter.optionalString().refine(
      (val) => !val || /^\+?[\d\s\-()\\.]{7,20}$/.test(val),
      { message: t.phoneInvalid },
    ),
    dni: ValidationAdapter.optionalString(),
  });
}

// ── Static type inference helpers ─────────────────────────────────────────
const _typeRef: ProfileValidationTranslations = {
  fullNameRequired: "",
  phoneInvalid: "",
};

export type UpdateProfileFormValues = InferValidationType<
  ReturnType<typeof createUpdateProfileSchema>
>;

export const updateProfileSchema = createUpdateProfileSchema(_typeRef);
