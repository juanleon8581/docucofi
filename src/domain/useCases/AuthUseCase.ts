import { AuthRepository } from "../repositories/IAuthRepository";
import { ValidationError } from "../errors/DomainError";
import { LoginDTO } from "../dtos/auth/login/Login.dto";
import { RegisterDTO } from "../dtos/auth/register/Register.dto";
import { IAuthResponse } from "../interfaces/IAuthResponse";

export class AuthUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(dto: LoginDTO): Promise<IAuthResponse> {
    if (!dto.email) throw new ValidationError("Email is required");
    return this.authRepository.signIn(dto);
  }

  async register(dto: RegisterDTO): Promise<IAuthResponse> {
    if (!dto.email) throw new ValidationError("Email is required");
    return this.authRepository.signUp(dto);
  }

  async logout(): Promise<void> {
    return this.authRepository.signOut();
  }

  async getSessionUser(): Promise<IAuthResponse | null> {
    return this.authRepository.getCurrentUser();
  }
}
