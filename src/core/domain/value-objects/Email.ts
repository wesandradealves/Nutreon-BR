import { ValueObject } from './ValueObject';
import { isValidEmail } from '@/utils/validation';
import { ERROR_MESSAGES } from '@/config/constants';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }

    return new Email({ value: email.toLowerCase().trim() });
  }

  static isValid(email: string): boolean {
    return isValidEmail(email);
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.value;
  }
}