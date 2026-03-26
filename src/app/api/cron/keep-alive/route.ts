import { NextResponse } from "next/server";
import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { AuthenticationError } from "@/domain/errors/DomainError";

/**
 * Endpoint designated to be called by a Cron Job (e.g., from Vercel or an external service)
 * to perform a dummy login to keep the Supabase project active and prevent pausing.
 */
export async function GET() {
  try {
    // Usamos el cliente del servidor de la infraestructura del proyecto
    const supabase = await createClient();
    const authAdapter = new SupabaseAuthAdapter(supabase);

    // Intentamos el login a través del adaptador del dominio
    try {
      await authAdapter.signIn({
        email: "keepalive-cron@docucofi.dummy",
        password: "dummy-keep-alive-password123",
      });
    } catch (error) {
      // Es de esperar que falle por credenciales inválidas.
      if (
        error instanceof AuthenticationError &&
        error.message !== "Invalid login credentials"
      ) {
        console.warn("Unexpected error during cron keep-alive:", error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Keep-alive ping sent to Supabase successfully.",
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
