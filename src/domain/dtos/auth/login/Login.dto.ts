import { IRawJson } from "@/domain/interfaces/IRawJson";

export interface ILoginDTO {
  email: string;
  password: string;
}

export class LoginDTO implements ILoginDTO {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(data: IRawJson): [string?, LoginDTO?] {
    const { email, password } = data;

    if (!email) {
      return ["Email is required", undefined];
    }

    if (!password) {
      return ["Password is required", undefined];
    }

    return [undefined, new LoginDTO(email, password)];
  }
}
