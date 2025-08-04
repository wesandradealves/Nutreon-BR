import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IPasswordHasher } from '@/core/application/interfaces/IPasswordHasher';
import { ERROR_MESSAGES } from '@/config/constants';

export interface ChangePasswordDTO {
  customerId: string;
  currentPassword: string;
  newPassword: string;
}

export class ChangePasswordUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(dto: ChangePasswordDTO): Promise<void> {
    // Buscar cliente
    const customer = await this.customerRepository.findById(dto.customerId);
    
    if (!customer) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Verificar se tem senha cadastrada
    if (!customer.passwordHash) {
      throw new Error(ERROR_MESSAGES.NO_PASSWORD_SET);
    }

    // Verificar senha atual
    const isValidPassword = await this.passwordHasher.compare(
      dto.currentPassword,
      customer.passwordHash
    );

    if (!isValidPassword) {
      throw new Error(ERROR_MESSAGES.INCORRECT_PASSWORD);
    }

    // Hash da nova senha
    const newPasswordHash = await this.passwordHasher.hash(dto.newPassword);
    
    // Atualizar senha
    customer.updatePassword(newPasswordHash);

    // Salvar alterações
    await this.customerRepository.save(customer);
  }
}