import { UserTemplateDataRepository } from "../repositories/IUserTemplateDataRepository";
import { CreateUserTemplateDataDTO } from "../dtos/userTemplateData/CreateUserTemplateData.dto";
import { UpdateUserTemplateDataDTO } from "../dtos/userTemplateData/UpdateUserTemplateData.dto";
import { UserTemplateData } from "../entities/UserTemplateData";
import { ValidationError } from "../errors/DomainError";
import { ValidationMessages } from "../messages/validation.messages";

export class UserTemplateDataUseCase {
  private readonly repository: UserTemplateDataRepository;

  constructor(repository: UserTemplateDataRepository) {
    this.repository = repository;
  }

  async getAllByUserId(userId: string): Promise<UserTemplateData[]> {
    return this.repository.getAllByUserId(userId);
  }

  async getById(id: string): Promise<UserTemplateData | null> {
    return this.repository.getById(id);
  }

  async create(dto: CreateUserTemplateDataDTO): Promise<UserTemplateData> {
    if (!dto.name) {
      throw new ValidationError(ValidationMessages.REQUIRED_FIELD("Name"));
    }
    return this.repository.create(dto);
  }

  async update(
    id: string,
    dto: UpdateUserTemplateDataDTO,
  ): Promise<UserTemplateData> {
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
