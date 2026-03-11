import { SupabaseClient } from "@supabase/supabase-js";
import { AuthenticationError } from "../../../domain/errors/DomainError";
import { SupabaseMapper } from "../../mappers/SupabaseMapper";
import { AuthRepository } from "@/domain/repositories/IAuthRepository";
import { LoginDTO } from "@/domain/dtos/auth/login/Login.dto";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { RegisterDTO } from "@/domain/dtos/auth/register/Register.dto";

export class SupabaseAuthAdapter implements AuthRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async signIn(dto: LoginDTO): Promise<IAuthResponse> {
    if (!dto.password) {
      throw new AuthenticationError(
        "Password is required for Supabase email sign in.",
      );
    }

    const { data, error } = await this.client.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      throw new AuthenticationError(error.message, error);
    }

    return SupabaseMapper.toDomainResponse(data.user);
  }

  async signUp(dto: RegisterDTO): Promise<IAuthResponse> {
    if (!dto.password) {
      throw new AuthenticationError(
        "Password is required for Supabase sign up.",
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
      throw new AuthenticationError(error.message, error);
    }

    return SupabaseMapper.toDomainResponse(data.user);
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) {
      throw new AuthenticationError(error.message, error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.client.auth.resetPasswordForEmail(email);
    if (error) {
      throw new AuthenticationError(error.message, error);
    }
  }

  async getCurrentUser(): Promise<IAuthResponse | null> {
    const {
      data: { user },
      error,
    } = await this.client.auth.getUser();

    if (error || !user) {
      return null;
    }

    return SupabaseMapper.toDomainResponse(user);
  }
}
