import { AuthError, SupabaseClient } from "@supabase/supabase-js";
import { AuthenticationError } from "../../../domain/errors/DomainError";
import { SupabaseMapper } from "../../mappers/SupabaseMapper";
import { AuthRepository, SignOutScope } from "@/domain/repositories/IAuthRepository";
import { LoginDTO } from "@/domain/dtos/auth/login/Login.dto";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { RegisterDTO } from "@/domain/dtos/auth/register/Register.dto";
import { AuthMessages } from "@/domain/messages/auth.messages";

export class SupabaseAuthAdapter implements AuthRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  private static mapError(error: AuthError) {
    const { message, code, name, status } = error;
    return { message, code, name, status };
  }

  async signIn(dto: LoginDTO): Promise<IAuthResponse> {
    if (!dto.password) {
      throw new AuthenticationError(
        AuthMessages.SUPABASE_PASS_REQUIRED_SIGN_IN,
      );
    }

    const { data, error } = await this.client.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      const errorDetails = SupabaseAuthAdapter.mapError(error);

      throw new AuthenticationError(errorDetails.message, errorDetails);
    }

    return SupabaseMapper.toDomainResponse(data.user);
  }

  async signUp(dto: RegisterDTO): Promise<IAuthResponse> {
    if (!dto.password) {
      throw new AuthenticationError(
        AuthMessages.SUPABASE_PASS_REQUIRED_SIGN_UP,
      );
    }

    const { data, error } = await this.client.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          full_name: dto.fullName,
        },
      },
    });

    if (error) {
      const errorDetails = SupabaseAuthAdapter.mapError(error);
      throw new AuthenticationError(errorDetails.message, errorDetails);
    }

    return SupabaseMapper.toDomainResponse(data.user);
  }

  async signOut(scope: SignOutScope = "local"): Promise<void> {
    const { error } = await this.client.auth.signOut({ scope });
    if (error) {
      const errorDetails = SupabaseAuthAdapter.mapError(error);
      throw new AuthenticationError(errorDetails.message, errorDetails);
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.client.auth.resetPasswordForEmail(email);
    if (error) {
      const errorDetails = SupabaseAuthAdapter.mapError(error);
      throw new AuthenticationError(errorDetails.message, errorDetails);
    }
  }

  async getCurrentUser(): Promise<IAuthResponse | null> {
    const {
      data: { user },
      error,
    } = await this.client.auth.getUser();

    if (error) {
      const errorDetails = SupabaseAuthAdapter.mapError(error);
      throw new AuthenticationError(errorDetails.message, errorDetails);
    }

    if (!user) {
      return null;
    }

    return SupabaseMapper.toDomainResponse(user);
  }
}
