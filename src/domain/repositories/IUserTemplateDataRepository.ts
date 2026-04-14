import { UserTemplateData } from "../entities/UserTemplateData";
import { CreateUserTemplateDataDTO } from "../dtos/userTemplateData/CreateUserTemplateData.dto";
import { UpdateUserTemplateDataDTO } from "../dtos/userTemplateData/UpdateUserTemplateData.dto";

export abstract class UserTemplateDataRepository {
  abstract getAllByUserId(userId: string): Promise<UserTemplateData[]>;
  abstract getById(id: string): Promise<UserTemplateData | null>;
  abstract create(dto: CreateUserTemplateDataDTO): Promise<UserTemplateData>;
  abstract update(
    id: string,
    dto: UpdateUserTemplateDataDTO,
  ): Promise<UserTemplateData>;
  abstract delete(id: string): Promise<void>;
}
