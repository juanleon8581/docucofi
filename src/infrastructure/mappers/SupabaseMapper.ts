import { User as SupabaseUser } from "@supabase/supabase-js";

import { AuthenticationError } from "../../domain/errors/DomainError";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { AuthMessages } from "@/domain/messages/auth.messages";
import { UpdateProfileDTO } from "@/domain/dtos/profile/UpdateProfile.dto";

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
        city: supabaseUser.user_metadata?.city ?? undefined,
        company: supabaseUser.user_metadata?.company ?? undefined,
        companyNit: supabaseUser.user_metadata?.company_nit ?? undefined,
        phone: supabaseUser.user_metadata?.phone ?? undefined,
        dni: supabaseUser.user_metadata?.dni ?? undefined,
        createdAt: supabaseUser.created_at
          ? new Date(supabaseUser.created_at)
          : undefined,
        updatedAt: supabaseUser.updated_at
          ? new Date(supabaseUser.updated_at)
          : undefined,
      },
    };
  }

  static toSupabaseMetadata(dto: UpdateProfileDTO): Record<string, string | undefined> {
    return {
      full_name: dto.fullName,
      city: dto.city,
      company: dto.company,
      company_nit: dto.companyNit,
      phone: dto.phone,
      dni: dto.dni,
    };
  }
}
