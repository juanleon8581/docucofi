export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
