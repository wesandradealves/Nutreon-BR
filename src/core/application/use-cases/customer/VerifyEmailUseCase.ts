import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IEmailVerificationRepository } from '@/core/domain/repositories/IEmailVerificationRepository';

export class VerifyEmailUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly emailVerificationRepository: IEmailVerificationRepository
  ) {}

  async execute(token: string): Promise<void> {
    // Buscar token de verificação
    const verification = await this.emailVerificationRepository.findByToken(token);
    
    if (!verification) {
      throw new Error('Token de verificação inválido');
    }

    // Verificar se já foi usado
    if (verification.verifiedAt) {
      throw new Error('Este email já foi verificado');
    }

    // Verificar se expirou
    if (verification.expiresAt < new Date()) {
      throw new Error('Token de verificação expirado');
    }

    // Buscar cliente
    const customer = await this.customerRepository.findById(verification.customerId);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    // Marcar cliente como verificado
    customer.verify();
    await this.customerRepository.save(customer);

    // Marcar token como usado
    await this.emailVerificationRepository.markAsVerified(token);
  }
}