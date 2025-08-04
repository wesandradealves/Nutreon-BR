import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IPasswordResetRepository } from '@/core/domain/repositories/IPasswordResetRepository';
import { IPasswordHasher } from '@/core/application/interfaces/IPasswordHasher';
import { ERROR_MESSAGES } from '@/config/constants';

export class ResetPasswordUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly passwordResetRepository: IPasswordResetRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    // Buscar token
    const passwordReset = await this.passwordResetRepository.findByToken(token);
    
    if (!passwordReset) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    // Verificar se já foi usado
    if (passwordReset.usedAt) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    // Verificar se expirou
    if (passwordReset.expiresAt < new Date()) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    // Buscar cliente
    const customer = await this.customerRepository.findById(passwordReset.customerId);
    
    if (!customer) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Hash da nova senha
    const passwordHash = await this.passwordHasher.hash(newPassword);

    // Atualizar senha
    customer.updatePassword(passwordHash);
    await this.customerRepository.save(customer);

    // Marcar token como usado
    await this.passwordResetRepository.markAsUsed(token);
  }
}