export interface IAuthResponse {
  user: {
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
  };
}
