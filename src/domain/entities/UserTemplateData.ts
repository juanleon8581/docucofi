export interface UserTemplateData {
  id: string;
  userId: string;
  templateId: string;
  name: string;
  data: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}
