"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { LoginFormValues } from "@/infrastructure/validations/authSchemas";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginFormValues) {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  await authAdapter.signIn({
    email: data.email,
    password: data.password,
  });

  // If the login is successful, we redirect to the main list or dashboard
  redirect("/dashboard");
}
