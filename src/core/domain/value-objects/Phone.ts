import { ValueObject } from './ValueObject';
import { formatPhone, isValidPhone, removePhoneMask } from '@/utils/formatters';
import { ERROR_MESSAGES } from '@/config/constants';

interface PhoneProps {
  value: string;
}

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props);
  }

  static create(phone: string): Phone {
    const cleaned = removePhoneMask(phone);
    
    if (!Phone.isValid(cleaned)) {
      throw new Error(ERROR_MESSAGES.INVALID_PHONE);
    }

    return new Phone({ value: cleaned });
  }

  static isValid(phone: string): boolean {
    return isValidPhone(phone);
  }

  get value(): string {
    return this.props.value;
  }

  format(): string {
    return formatPhone(this.value);
  }

  toString(): string {
    return this.format();
  }
}