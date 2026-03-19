"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { AuthMessages } from "@/domain/messages/auth.messages";
import { redirect } from "next/navigation";
import { type Locale } from "@/infrastructure/i18n/config";
import { type SignOutScope } from "@/domain/repositories/IAuthRepository";

export async function logoutAction(
  locale: Locale,
  scope: SignOutScope = "local",
): Promise<{ error?: string } | void> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.signOut(scope);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: AuthMessages.ACTION_LOGOUT_FAILED };
  }

  redirect(`/${locale}/login`);
}
