import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../repositories/PrismaCustomerRepository';
import { PrismaPasswordResetRepository } from '../repositories/PrismaPasswordResetRepository';
import { PrismaSessionRepository } from '../repositories/PrismaSessionRepository';
import { PrismaEmailVerificationRepository } from '../repositories/PrismaEmailVerificationRepository';
import { PrismaFavoriteRepository } from '../repositories/PrismaFavoriteRepository';
import { PrismaCartRepository } from '../repositories/cart.repository';
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
import { VerifyEmailUseCase } from '@/core/application/use-cases/customer/VerifyEmailUseCase';
import { ResendVerificationEmailUseCase } from '@/core/application/use-cases/customer/ResendVerificationEmailUseCase';
import { ToggleFavoriteUseCase } from '@/core/application/use-cases/favorites/ToggleFavoriteUseCase';
import { GetFavoritesUseCase } from '@/core/application/use-cases/favorites/GetFavoritesUseCase';
import { SyncFavoritesUseCase } from '@/core/application/use-cases/favorites/SyncFavoritesUseCase';
import { GetOrCreateCartUseCase } from '@/core/application/use-cases/cart/GetOrCreateCartUseCase';
import { AddToCartUseCase } from '@/core/application/use-cases/cart/AddToCartUseCase';
import { UpdateCartItemUseCase } from '@/core/application/use-cases/cart/UpdateCartItemUseCase';
import { RemoveFromCartUseCase } from '@/core/application/use-cases/cart/RemoveFromCartUseCase';
import { ClearCartUseCase } from '@/core/application/use-cases/cart/ClearCartUseCase';
import { GetCartUseCase } from '@/core/application/use-cases/cart/GetCartUseCase';
import { SyncCartUseCase } from '@/core/application/use-cases/cart/SyncCartUseCase';

// Singleton do Prisma
const prisma = new PrismaClient();

// Repositories
const customerRepository = new PrismaCustomerRepository(prisma);
const passwordResetRepository = new PrismaPasswordResetRepository(prisma);
const sessionRepository = new PrismaSessionRepository(prisma);
const emailVerificationRepository = new PrismaEmailVerificationRepository(prisma);
const favoriteRepository = new PrismaFavoriteRepository(prisma);
const cartRepository = new PrismaCartRepository(prisma);

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
  emailVerificationRepository,
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

const verifyEmailUseCase = new VerifyEmailUseCase(
  customerRepository,
  emailVerificationRepository,
  sessionRepository,
  tokenService
);

const resendVerificationEmailUseCase = new ResendVerificationEmailUseCase(
  customerRepository,
  emailVerificationRepository,
  emailService
);

const toggleFavoriteUseCase = new ToggleFavoriteUseCase(favoriteRepository);
const getFavoritesUseCase = new GetFavoritesUseCase(favoriteRepository);
const syncFavoritesUseCase = new SyncFavoritesUseCase(favoriteRepository);

const getOrCreateCartUseCase = new GetOrCreateCartUseCase(cartRepository);
const addToCartUseCase = new AddToCartUseCase(cartRepository);
const updateCartItemUseCase = new UpdateCartItemUseCase(cartRepository);
const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);
const clearCartUseCase = new ClearCartUseCase(cartRepository);
const getCartUseCase = new GetCartUseCase(cartRepository);
const syncCartUseCase = new SyncCartUseCase(cartRepository);

export const container = {
  // Database
  prisma,
  
  // Repositories
  customerRepository,
  passwordResetRepository,
  sessionRepository,
  emailVerificationRepository,
  favoriteRepository,
  cartRepository,
  
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
  verifyEmailUseCase,
  resendVerificationEmailUseCase,
  toggleFavoriteUseCase,
  getFavoritesUseCase,
  syncFavoritesUseCase,
  getOrCreateCartUseCase,
  addToCartUseCase,
  updateCartItemUseCase,
  removeFromCartUseCase,
  clearCartUseCase,
  getCartUseCase,
  syncCartUseCase,
  
  // Helper method to resolve dependencies
  resolve<T>(key: string): T {
    return (this as Record<string, unknown>)[key] as T;
  }
};

export type Container = typeof container;