import { IRawJson } from "@/domain/interfaces/IRawJson";
import { ValidationMessages } from "@/domain/messages/validation.messages";

export interface ICreateUserTemplateDataDTO {
  userId: string;
  templateId: string;
  name: string;
  data: Record<string, string>;
}

export class CreateUserTemplateDataDTO implements ICreateUserTemplateDataDTO {
  private constructor(
    public userId: string,
    public templateId: string,
    public name: string,
    public data: Record<string, string>,
  ) {}

  static create(rawData: IRawJson): [string?, CreateUserTemplateDataDTO?] {
    const { userId, templateId, name, data } = rawData;
    if (!userId) return [ValidationMessages.REQUIRED_FIELD("User"), undefined];
    if (!templateId)
      return [ValidationMessages.REQUIRED_FIELD("Template"), undefined];
    if (!name) return [ValidationMessages.REQUIRED_FIELD("Name"), undefined];
    if (!data) return [ValidationMessages.REQUIRED_FIELD("Data"), undefined];
    return [undefined, new CreateUserTemplateDataDTO(userId, templateId, name, data)];
  }
}
