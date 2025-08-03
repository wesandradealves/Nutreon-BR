import { ValueObject } from './ValueObject';

interface PhoneProps {
  value: string;
}

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props);
  }

  static create(phone: string): Phone {
    const cleaned = phone.replace(/\D/g, '');
    
    if (!Phone.isValid(cleaned)) {
      throw new Error('Telefone inválido');
    }

    return new Phone({ value: cleaned });
  }

  static isValid(phone: string): boolean {
    // Valida telefones brasileiros (fixo ou celular)
    return /^[1-9]{2}[2-9]?[0-9]{8}$/.test(phone);
  }

  get value(): string {
    return this.props.value;
  }

  format(): string {
    const phone = this.value;
    if (phone.length === 11) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    }
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  }

  toString(): string {
    return this.format();
  }
}