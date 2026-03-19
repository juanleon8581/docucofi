export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
