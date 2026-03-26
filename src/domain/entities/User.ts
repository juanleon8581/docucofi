export interface IUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  city?: string;
  company?: string;
  companyNit?: string;
  phone?: string;
  dni?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public fullName?: string,
    public avatarUrl?: string,
    public city?: string,
    public company?: string,
    public companyNit?: string,
    public phone?: string,
    public dni?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
