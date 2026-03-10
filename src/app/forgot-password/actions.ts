"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { ForgotPasswordFormValues } from "@/infrastructure/validations/authSchemas";

export async function forgotPasswordAction(data: ForgotPasswordFormValues) {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  await authAdapter.resetPassword(data.email);

  // Return logic, the client will show the success banner
  return { success: true };
}
