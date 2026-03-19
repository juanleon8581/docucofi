/**
 * Messages specifically related to Authentication business rules
 */
export const AuthMessages = {
  INVALID_CREDENTIALS: "Email or password incorrect",
  USER_NOT_FOUND: "User does not exist in our records",
  SESSION_EXPIRED: "Your session has expired, please login again",
  SUPABASE_PASS_REQUIRED_SIGN_IN:
    "Password is required for Supabase email sign in.",
  SUPABASE_PASS_REQUIRED_SIGN_UP:
    "Password is required for Supabase email sign up.",
  SUPABASE_USER_DATA_MISSING: "User data is missing in the database response",
  ACTION_LOGIN_FAILED: "Error logging in",
  ACTION_LOGOUT_FAILED: "Error logging out",
  ACTION_REGISTER_FAILED: "Registration failed",
  ACTION_RESET_PASS_FAILED: "Failed to request password reset",
} as const;
