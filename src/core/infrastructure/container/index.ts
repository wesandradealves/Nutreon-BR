import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../repositories/PrismaCustomerRepository';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher';
import { JwtTokenService } from '../services/JwtTokenService';
import { NodemailerEmailService } from '../email/NodemailerEmailService';
import { RegisterCustomerUseCase } from '@/core/application/use-cases/customer/RegisterCustomerUseCase';
import { AuthenticateCustomerUseCase } from '@/core/application/use-cases/customer/AuthenticateCustomerUseCase';
import { UpdateCustomerUseCase } from '@/core/application/use-cases/customer/UpdateCustomerUseCase';
import { ChangePasswordUseCase } from '@/core/application/use-cases/customer/ChangePasswordUseCase';

// Singleton do Prisma
const prisma = new PrismaClient();

// Repositories
const customerRepository = new PrismaCustomerRepository(prisma);

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

export const container = {
  // Database
  prisma,
  
  // Repositories
  customerRepository,
  
  // Services
  passwordHasher,
  tokenService,
  emailService,
  
  // Use Cases
  registerCustomerUseCase,
  authenticateCustomerUseCase,
  updateCustomerUseCase,
  changePasswordUseCase,
};

export type Container = typeof container;