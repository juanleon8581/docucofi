import { PrismaClient } from "@prisma/client";
import { UserTemplateDataRepository } from "@/domain/repositories/IUserTemplateDataRepository";
import { CreateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/CreateUserTemplateData.dto";
import { UpdateUserTemplateDataDTO } from "@/domain/dtos/userTemplateData/UpdateUserTemplateData.dto";
import { UserTemplateData } from "@/domain/entities/UserTemplateData";

export class PrismaUserTemplateDataAdapter implements UserTemplateDataRepository {
  private readonly client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getAllByUserId(userId: string): Promise<UserTemplateData[]> {
    const records = await this.client.userTemplateData.findMany({
      where: { userId },
    });
    return records.map((r) => UserTemplateData.fromRaw(r));
  }

  async getById(id: string): Promise<UserTemplateData | null> {
    const record = await this.client.userTemplateData.findUnique({
      where: { id },
    });
    return record ? UserTemplateData.fromRaw(record) : null;
  }

  async create(dto: CreateUserTemplateDataDTO): Promise<UserTemplateData> {
    const record = await this.client.userTemplateData.create({
      data: {
        userId: dto.userId,
        templateId: dto.templateId,
        name: dto.name,
        data: dto.data,
      },
    });
    return UserTemplateData.fromRaw(record);
  }

  async update(
    id: string,
    dto: UpdateUserTemplateDataDTO,
  ): Promise<UserTemplateData> {
    const record = await this.client.userTemplateData.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.data !== undefined && { data: dto.data }),
      },
    });
    return UserTemplateData.fromRaw(record);
  }

  async delete(id: string): Promise<void> {
    await this.client.userTemplateData.delete({ where: { id } });
  }
}
