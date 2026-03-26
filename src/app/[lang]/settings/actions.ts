"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { UpdateProfileFormValues } from "@/infrastructure/validations/profileSchemas";
import { AuthMessages } from "@/domain/messages/auth.messages";
import { type Locale } from "@/infrastructure/i18n/config";

export async function updateProfileAction(
  data: UpdateProfileFormValues,
  _locale: Locale,
): Promise<{ error?: string } | void> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.updateProfile({
      fullName: data.fullName,
      city: data.city || undefined,
      company: data.company || undefined,
      companyNit: data.companyNit || undefined,
      phone: data.phone || undefined,
      dni: data.dni || undefined,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: AuthMessages.ACTION_UPDATE_PROFILE_FAILED };
  }
}
