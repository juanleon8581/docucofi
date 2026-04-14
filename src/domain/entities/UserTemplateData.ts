import { IRawJson } from "@/domain/interfaces/IRawJson";

export interface IUserTemplateData {
  id: string;
  userId: string;
  templateId: string;
  name: string;
  data: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export class UserTemplateData implements IUserTemplateData {
  private constructor(
    public id: string,
    public userId: string,
    public templateId: string,
    public name: string,
    public data: Record<string, string>,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromRaw(raw: IRawJson): UserTemplateData {
    return new UserTemplateData(
      raw.id,
      raw.userId,
      raw.templateId,
      raw.name,
      raw.data as Record<string, string>,
      raw.createdAt as Date,
      raw.updatedAt as Date,
    );
  }
}
