"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { ForgotPasswordFormValues } from "@/infrastructure/validations/authSchemas";
import { AuthMessages } from "@/domain/messages/auth.messages";

export async function forgotPasswordAction(
  data: ForgotPasswordFormValues,
): Promise<{ error?: string; success?: true }> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.resetPassword(data.email);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: AuthMessages.ACTION_RESET_PASS_FAILED };
  }

  // Return logic, the client will show the success banner
  return { success: true };
}
