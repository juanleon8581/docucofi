import { User as SupabaseUser } from "@supabase/supabase-js";

import { AuthenticationError } from "../../domain/errors/DomainError";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { AuthMessages } from "@/domain/messages/auth.messages";

export class SupabaseMapper {
  static toDomainResponse(supabaseUser: SupabaseUser | null): IAuthResponse {
    if (!supabaseUser) {
      throw new AuthenticationError(
        AuthMessages.SUPABASE_USER_DATA_MISSING,
      );
    }

    return {
      user: {
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        fullName: supabaseUser.user_metadata?.full_name ?? undefined,
        avatarUrl: supabaseUser.user_metadata?.avatar_url ?? undefined,
        createdAt: supabaseUser.created_at
          ? new Date(supabaseUser.created_at)
          : undefined,
        updatedAt: supabaseUser.updated_at
          ? new Date(supabaseUser.updated_at)
          : undefined,
      },
    };
  }
}
