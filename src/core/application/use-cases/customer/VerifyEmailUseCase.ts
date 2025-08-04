import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IEmailVerificationRepository } from '@/core/domain/repositories/IEmailVerificationRepository';
import { ISessionRepository } from '@/core/domain/repositories/ISessionRepository';
import { ITokenService } from '@/core/application/interfaces/ITokenService';
import { AuthResponseDTO } from '@/core/application/dtos/customer/CustomerResponseDTO';
import { ERROR_MESSAGES } from '@/config/constants';

export class VerifyEmailUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly emailVerificationRepository: IEmailVerificationRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly tokenService: ITokenService
  ) {}

  async execute(token: string, context?: { ipAddress?: string; userAgent?: string }): Promise<AuthResponseDTO> {
    // Buscar token de verificação
    const verification = await this.emailVerificationRepository.findByToken(token);
    
    if (!verification) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    // Verificar se já foi usado
    if (verification.verifiedAt) {
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED);
    }

    // Verificar se expirou
    if (verification.expiresAt < new Date()) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    // Buscar cliente
    const customer = await this.customerRepository.findById(verification.customerId);
    
    if (!customer) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Marcar cliente como verificado
    customer.verify();
    await this.customerRepository.save(customer);

    // Marcar token como usado
    await this.emailVerificationRepository.markAsVerified(token);

    // Gerar token JWT para login automático
    const authToken = await this.tokenService.generateToken({
      customerId: customer.id,
      email: customer.email.value,
    });

    // Criar sessão no banco
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Sessão válida por 7 dias
    
    await this.sessionRepository.create({
      customerId: customer.id,
      token: authToken,
      userAgent: context?.userAgent || 'Email verification',
      ipAddress: context?.ipAddress || 'Unknown',
      expiresAt,
    });

    return {
      token: authToken,
      customer: {
        id: customer.id,
        email: customer.email.value,
        name: customer.name,
        phone: customer.phone?.value,
        verified: true,
      },
    };
  }
}