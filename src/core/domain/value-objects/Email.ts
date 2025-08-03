import { ValueObject } from './ValueObject';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new Error('Email inválido');
    }

    return new Email({ value: email.toLowerCase().trim() });
  }

  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.value;
  }
}