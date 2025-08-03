export interface StoreAuthData {
  id: number;
  name: { [key: string]: string };
  email: string;
  original_domain: string;
  plan_name: string;
  [key: string]: unknown;
}

export interface CustomerAuthData {
  token: string;
  customer: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}