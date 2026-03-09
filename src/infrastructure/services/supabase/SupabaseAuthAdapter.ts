import { SupabaseClient } from "@supabase/supabase-js";
import { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import {
  LoginDTO,
  RegisterDTO,
  AuthResponseDTO,
} from "../../../domain/dtos/AuthDTOs";
import { AuthenticationError } from "../../../domain/errors/DomainError";
import { SupabaseMapper } from "../../mappers/SupabaseMapper";

export class SupabaseAuthAdapter implements IAuthRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async signIn(dto: LoginDTO): Promise<AuthResponseDTO> {
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

  async signUp(dto: RegisterDTO): Promise<AuthResponseDTO> {
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

  async getCurrentUser(): Promise<AuthResponseDTO | null> {
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
