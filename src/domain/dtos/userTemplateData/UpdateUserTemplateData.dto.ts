import { IRawJson } from "@/domain/interfaces/IRawJson";
import { ValidationMessages } from "@/domain/messages/validation.messages";

export interface IUpdateUserTemplateDataDTO {
  name?: string;
  data?: Record<string, string>;
}

export class UpdateUserTemplateDataDTO implements IUpdateUserTemplateDataDTO {
  private constructor(
    public name?: string,
    public data?: Record<string, string>,
  ) {}

  static create(rawData: IRawJson): [string?, UpdateUserTemplateDataDTO?] {
    const { name, data } = rawData;
    if (!name && !data)
      return [ValidationMessages.REQUIRED_FIELD("Name or data"), undefined];
    return [undefined, new UpdateUserTemplateDataDTO(name, data)];
  }
}
