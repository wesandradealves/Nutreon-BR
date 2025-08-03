import { AggregateRoot } from './base/AggregateRoot';
import { Email } from '../value-objects/Email';
import { Phone } from '../value-objects/Phone';
import { Address } from '../value-objects/Address';

export interface CustomerProps {
  email: Email;
  name: string;
  phone?: Phone;
  passwordHash?: string;
  verified?: boolean;
  nuvemshopId?: string;
  addresses?: Address[];
}

export class Customer extends AggregateRoot<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
  }

  static create(props: CustomerProps, id?: string): Customer {
    return new Customer(props, id);
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get phone(): Phone | undefined {
    return this.props.phone;
  }

  get passwordHash(): string | undefined {
    return this.props.passwordHash;
  }

  get verified(): boolean {
    return this.props.verified || false;
  }

  get nuvemshopId(): string | undefined {
    return this.props.nuvemshopId;
  }

  get addresses(): Address[] {
    return this.props.addresses || [];
  }

  verify(): void {
    this.props.verified = true;
  }

  addAddress(address: Address): void {
    if (!this.props.addresses) {
      this.props.addresses = [];
    }
    
    // Se for o primeiro endereço, torná-lo padrão
    const addressToAdd = this.props.addresses.length === 0 
      ? address.withDefault(true)
      : address;
    
    this.props.addresses.push(addressToAdd);
  }

  setDefaultAddress(addressId: string): void {
    if (!this.props.addresses) return;
    
    this.props.addresses = this.props.addresses.map(address => 
      address.id === addressId 
        ? address.withDefault(true)
        : address.withDefault(false)
    );
  }

  updatePassword(passwordHash: string): void {
    this.props.passwordHash = passwordHash;
  }

  linkNuvemshop(nuvemshopId: string): void {
    this.props.nuvemshopId = nuvemshopId;
  }
}