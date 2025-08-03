import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../repositories/PrismaCustomerRepository';
import { PrismaPasswordResetRepository } from '../repositories/PrismaPasswordResetRepository';
import { PrismaSessionRepository } from '../repositories/PrismaSessionRepository';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher';
import { JwtTokenService } from '../services/JwtTokenService';
import { NodemailerEmailService } from '../email/NodemailerEmailService';
import { RegisterCustomerUseCase } from '@/core/application/use-cases/customer/RegisterCustomerUseCase';
import { AuthenticateCustomerUseCase } from '@/core/application/use-cases/customer/AuthenticateCustomerUseCase';
import { UpdateCustomerUseCase } from '@/core/application/use-cases/customer/UpdateCustomerUseCase';
import { ChangePasswordUseCase } from '@/core/application/use-cases/customer/ChangePasswordUseCase';
import { RequestPasswordResetUseCase } from '@/core/application/use-cases/customer/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '@/core/application/use-cases/customer/ResetPasswordUseCase';
import { LogoutCustomerUseCase } from '@/core/application/use-cases/customer/LogoutCustomerUseCase';

// Singleton do Prisma
const prisma = new PrismaClient();

// Repositories
const customerRepository = new PrismaCustomerRepository(prisma);
const passwordResetRepository = new PrismaPasswordResetRepository(prisma);
const sessionRepository = new PrismaSessionRepository(prisma);

// Services
const passwordHasher = new BcryptPasswordHasher();
// Validar configuração obrigatória
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não configurado. Defina a variável de ambiente JWT_SECRET.');
}

const tokenService = new JwtTokenService(
  process.env.JWT_SECRET,
  '7d'
);

const emailService = new NodemailerEmailService();

// Use Cases
const registerCustomerUseCase = new RegisterCustomerUseCase(
  customerRepository,
  passwordHasher,
  emailService
);

const authenticateCustomerUseCase = new AuthenticateCustomerUseCase(
  customerRepository,
  sessionRepository,
  passwordHasher,
  tokenService,
  emailService
);

const updateCustomerUseCase = new UpdateCustomerUseCase(
  customerRepository
);

const changePasswordUseCase = new ChangePasswordUseCase(
  customerRepository,
  passwordHasher
);

const requestPasswordResetUseCase = new RequestPasswordResetUseCase(
  customerRepository,
  passwordResetRepository,
  emailService
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  customerRepository,
  passwordResetRepository,
  passwordHasher
);

const logoutCustomerUseCase = new LogoutCustomerUseCase(
  sessionRepository
);

export const container = {
  // Database
  prisma,
  
  // Repositories
  customerRepository,
  passwordResetRepository,
  sessionRepository,
  
  // Services
  passwordHasher,
  tokenService,
  emailService,
  
  // Use Cases
  registerCustomerUseCase,
  authenticateCustomerUseCase,
  updateCustomerUseCase,
  changePasswordUseCase,
  requestPasswordResetUseCase,
  resetPasswordUseCase,
  logoutCustomerUseCase,
  
  // Helper method to resolve dependencies
  resolve<T>(key: string): T {
    return (this as Record<string, unknown>)[key] as T;
  }
};

export type Container = typeof container;