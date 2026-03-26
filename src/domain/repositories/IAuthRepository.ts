import { LoginDTO } from "../dtos/auth/login/Login.dto";
import { RegisterDTO } from "../dtos/auth/register/Register.dto";
import { UpdateProfileDTO } from "../dtos/profile/UpdateProfile.dto";
import { IAuthResponse } from "../interfaces/IAuthResponse";

export type SignOutScope = "local" | "global" | "others";

export abstract class AuthRepository {
  abstract signIn(dto: LoginDTO): Promise<IAuthResponse>;
  abstract signUp(dto: RegisterDTO): Promise<IAuthResponse>;
  abstract signOut(scope?: SignOutScope): Promise<void>;
  abstract resetPassword(email: string): Promise<void>;
  abstract getCurrentUser(): Promise<IAuthResponse | null>;
  abstract updateProfile(dto: UpdateProfileDTO): Promise<IAuthResponse>;
}
