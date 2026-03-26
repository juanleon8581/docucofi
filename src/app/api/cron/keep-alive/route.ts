import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Endpoint designated to be called by a Cron Job (e.g., from Vercel or an external service)
 * to perform a dummy login to keep the Supabase project active and prevent pausing.
 * 
 * You can set this up in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/keep-alive",
 *     "schedule": "0 0 * * *" // once a day
 *   }]
 * }
 */
export async function GET(request: Request) {
  // Optional: Check a cron secret to prevent unauthorized calls
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Try to get anon key through either publishable or anon env variables
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: "Missing Supabase configuration." },
        { status: 500 },
      );
    }

    // Use a standard client instead of the SSR one because we don't need cookie management
    // for a simple background server task.
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Attempt a dummy login. This triggers the Supabase Auth API and writes to DB logs, 
    // counting as activity to keep the free-tier database from pausing.
    const { error } = await supabase.auth.signInWithPassword({
      email: "keepalive-cron@docucofi.dummy",
      password: "dummy-keep-alive-password123",
    });

    // It's expected to get an "Invalid login credentials" error since we are using a dummy user.
    if (error && error.message !== "Invalid login credentials") {
      console.warn("Unexpected error during cron keep-alive:", error.message);
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
