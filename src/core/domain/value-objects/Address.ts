import { ValueObject } from './ValueObject';
import { randomUUID } from 'crypto';
import { isValidCEP } from '@/utils/validation';
import { formatCEP } from '@/utils/formatters';
import { ERROR_MESSAGES } from '@/config/constants';

interface AddressProps {
  id?: string;
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

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  static create(props: Omit<AddressProps, 'id' | 'isDefault'> & { isDefault?: boolean }): Address {
    const zipCode = props.zipCode.replace(/\D/g, '');
    
    if (!Address.isValidZipCode(zipCode)) {
      throw new Error(ERROR_MESSAGES.INVALID_CEP);
    }

    return new Address({
      id: randomUUID(),
      ...props,
      zipCode,
      isDefault: props.isDefault || false,
    });
  }

  static isValidZipCode(zipCode: string): boolean {
    return isValidCEP(zipCode);
  }

  get id(): string {
    return this.props.id!;
  }

  get street(): string {
    return this.props.street;
  }

  get number(): string {
    return this.props.number;
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  get country(): string {
    return this.props.country;
  }

  get isDefault(): boolean {
    return this.props.isDefault;
  }

  withDefault(isDefault: boolean): Address {
    return new Address({
      ...this.props,
      isDefault,
    });
  }

  formatZipCode(): string {
    return formatCEP(this.zipCode);
  }

  toString(): string {
    let address = `${this.street}, ${this.number}`;
    if (this.complement) {
      address += ` - ${this.complement}`;
    }
    address += `, ${this.neighborhood}, ${this.city} - ${this.state}, ${this.formatZipCode()}`;
    return address;
  }
}