import { randomBytes } from 'crypto';
import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IPasswordResetRepository } from '@/core/domain/repositories/IPasswordResetRepository';
import { IEmailService } from '@/core/domain/services/IEmailService';
import { Email } from '@/core/domain/value-objects/Email';

export class RequestPasswordResetUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly passwordResetRepository: IPasswordResetRepository,
    private readonly emailService: IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    try {
      const emailObj = Email.create(email);
      const customer = await this.customerRepository.findByEmail(emailObj);
    
    if (!customer) {
      // Não revelamos se o email existe ou não por segurança
      return;
    }

    // Gerar token único
    const token = randomBytes(32).toString('hex');
    
    // Token expira em 1 hora
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Salvar token no banco
    await this.passwordResetRepository.create(customer.id, token, expiresAt);

    // Enviar email
    await this.emailService.sendPasswordResetEmail(
      customer.email.value,
      customer.name,
      token
    );
    } catch (error) {
      // Se o email for inválido, não revelamos o erro por segurança
      console.error('Erro ao processar recuperação de senha:', error);
      return;
    }
  }
}