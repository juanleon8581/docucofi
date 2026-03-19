export interface IUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public fullName?: string,
    public avatarUrl?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
