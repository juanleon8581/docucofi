import { IRawJson } from "@/domain/interfaces/IRawJson";

export interface IRegisterDTO {
  email: string;
  password?: string;
  fullName?: string;
}

export class RegisterDTO implements IRegisterDTO {
  private constructor(
    public email: string,
    public password: string,
    public fullName: string,
  ) {}

  static create(data: IRawJson): [string?, RegisterDTO?] {
    const { email, password, fullName } = data;
    if (!email) return ["Email is required", undefined];
    if (!password) return ["Password is required", undefined];
    if (!fullName) return ["Full name is required", undefined];
    return [undefined, new RegisterDTO(email, password, fullName)];
  }
}
