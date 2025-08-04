import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { ISessionRepository } from '@/core/domain/repositories/ISessionRepository';
import { Email } from '@/core/domain/value-objects/Email';
import { IPasswordHasher } from '@/core/application/interfaces/IPasswordHasher';
import { ITokenService } from '@/core/application/interfaces/ITokenService';
import { IEmailService } from '@/core/domain/services/IEmailService';
import { AuthenticateCustomerDTO } from '@/core/application/dtos/customer/AuthenticateCustomerDTO';
import { AuthResponseDTO } from '@/core/application/dtos/customer/CustomerResponseDTO';
import { ERROR_MESSAGES } from '@/config/constants';

export interface LoginContext {
  ipAddress?: string;
  userAgent?: string;
}

export class AuthenticateCustomerUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly emailService?: IEmailService
  ) {}

  async execute(dto: AuthenticateCustomerDTO, context?: LoginContext): Promise<AuthResponseDTO> {
    // Validar email
    const email = Email.create(dto.email);
    
    // Buscar cliente
    const customer = await this.customerRepository.findByEmail(email);
    if (!customer) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Verificar se tem senha cadastrada
    if (!customer.passwordHash) {
      throw new Error(`${ERROR_MESSAGES.NO_PASSWORD_SET}. Faça login via Nuvemshop.`);
    }

    // Verificar senha
    const passwordValid = await this.passwordHasher.compare(
      dto.password,
      customer.passwordHash
    );
    
    if (!passwordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Gerar token JWT
    const token = await this.tokenService.generateToken({
      customerId: customer.id,
      email: customer.email.value,
    });

    // Criar sessão no banco
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Sessão válida por 7 dias
    
    await this.sessionRepository.create({
      customerId: customer.id,
      token,
      userAgent: context?.userAgent,
      ipAddress: context?.ipAddress,
      expiresAt,
    });

    // Enviar notificação de login (não bloqueia o fluxo)
    if (this.emailService) {
      this.emailService.sendLoginNotificationEmail(
        customer.email.value,
        customer.name,
        context?.ipAddress,
        context?.userAgent
      ).catch(error => console.error('Erro ao enviar notificação de login:', error));
    }

    return {
      token,
      customer: {
        id: customer.id,
        email: customer.email.value,
        name: customer.name,
        phone: customer.phone?.value,
        verified: customer.verified,
      },
    };
  }
}