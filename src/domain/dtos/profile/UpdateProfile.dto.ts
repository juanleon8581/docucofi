import { IRawJson } from "@/domain/interfaces/IRawJson";
import { ValidationMessages } from "@/domain/messages/validation.messages";

export interface IUpdateProfileDTO {
  fullName: string;
  city?: string;
  company?: string;
  companyNit?: string;
  phone?: string;
  dni?: string;
}

export class UpdateProfileDTO implements IUpdateProfileDTO {
  private constructor(
    public fullName: string,
    public city?: string,
    public company?: string,
    public companyNit?: string,
    public phone?: string,
    public dni?: string,
  ) {}

  static create(data: IRawJson): [string?, UpdateProfileDTO?] {
    const { fullName, city, company, companyNit, phone, dni } = data;
    if (!fullName) return [ValidationMessages.REQUIRED_FIELD("Full name"), undefined];
    return [undefined, new UpdateProfileDTO(fullName, city, company, companyNit, phone, dni)];
  }
}
