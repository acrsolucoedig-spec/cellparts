export enum UserRole {
  CLIENT = 'client',
  DRIVER = 'driver',
  SHOPKEEPER = 'shopkeeper',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  cpf?: string;
  cnpj?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
