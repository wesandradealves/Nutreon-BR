import { randomBytes } from 'crypto';
import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { IEmailVerificationRepository } from '@/core/domain/repositories/IEmailVerificationRepository';
import { Customer } from '@/core/domain/entities/Customer';
import { Email } from '@/core/domain/value-objects/Email';
import { Phone } from '@/core/domain/value-objects/Phone';
import { IPasswordHasher } from '@/core/application/interfaces/IPasswordHasher';
import { IEmailService } from '@/core/domain/services/IEmailService';
import { RegisterCustomerDTO } from '@/core/application/dtos/customer/RegisterCustomerDTO';

export class RegisterCustomerUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly emailVerificationRepository: IEmailVerificationRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly emailService?: IEmailService
  ) {}

  async execute(dto: RegisterCustomerDTO): Promise<{ customerId: string }> {
    // Validar email
    const email = Email.create(dto.email);
    
    // Verificar se cliente já existe
    const exists = await this.customerRepository.exists(email);
    if (exists) {
      throw new Error('Cliente já cadastrado com este email');
    }

    // Validar telefone se fornecido
    const phone = dto.phone ? Phone.create(dto.phone) : undefined;

    // Hash da senha
    const passwordHash = dto.password 
      ? await this.passwordHasher.hash(dto.password)
      : undefined;

    // Criar entidade Customer
    const customer = Customer.create({
      email,
      name: dto.name,
      phone,
      passwordHash,
      verified: false,
    });

    // Salvar no repositório
    await this.customerRepository.save(customer);

    // Criar token de verificação
    const verificationToken = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token válido por 24 horas

    await this.emailVerificationRepository.create(
      customer.id,
      verificationToken,
      expiresAt
    );

    // Enviar email de boas-vindas com link de verificação
    if (this.emailService) {
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken}`;
      this.emailService.sendWelcomeEmail(dto.email, dto.name, verificationLink)
        .catch(error => console.error('Erro ao enviar email de boas-vindas:', error));
    }

    return { customerId: customer.id };
  }
}