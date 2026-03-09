export interface LoginDTO {
  email: string;
  password?: string;
}

export interface RegisterDTO {
  email: string;
  password?: string;
  fullName?: string;
}

// Opcional: Para respuestas más enriquecidas que devuelven el usuario u otra metadata
export interface AuthResponseDTO {
  user: {
    id: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
