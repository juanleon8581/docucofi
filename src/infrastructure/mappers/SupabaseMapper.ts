import { User as SupabaseUser } from "@supabase/supabase-js";

import { AuthenticationError } from "../../domain/errors/DomainError";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";

export class SupabaseMapper {
  static toDomainResponse(supabaseUser: SupabaseUser | null): IAuthResponse {
    if (!supabaseUser) {
      throw new AuthenticationError(
        "User data is missing in the database response",
      );
    }

    return {
      user: {
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
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
