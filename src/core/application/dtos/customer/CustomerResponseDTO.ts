export interface AddressDTO {
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

export interface CustomerResponseDTO {
  id: string;
  email: string;
  name: string;
  phone?: string;
  verified: boolean;
  addresses?: AddressDTO[];
}

export interface AuthResponseDTO {
  token: string;
  customer: CustomerResponseDTO;
}