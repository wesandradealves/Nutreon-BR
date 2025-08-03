export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  verified: boolean;
  addresses?: Address[];
  nuvemshopId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}