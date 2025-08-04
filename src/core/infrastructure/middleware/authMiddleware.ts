import { NextRequest } from 'next/server';
import { container } from '../container';
import { createApiError } from './errorHandler';

export interface AuthenticatedRequest extends NextRequest {
  customerId?: string;
  customerEmail?: string;
}

export async function requireAuth(
  request: NextRequest
): Promise<{ customerId: string; email: string }> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    throw createApiError('Não autenticado', 401);
  }

  const payload = await container.tokenService.verifyToken(token);
  
  if (!payload) {
    throw createApiError('Token inválido', 401);
  }

  return {
    customerId: payload.customerId,
    email: payload.email,
  };
}

export async function authMiddleware(
  request: NextRequest
): Promise<{ authenticated: boolean; customerId?: string; email?: string }> {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return { authenticated: false };
    }

    const payload = await container.tokenService.verifyToken(token);
    
    if (!payload) {
      return { authenticated: false };
    }

    return {
      authenticated: true,
      customerId: payload.customerId,
      email: payload.email,
    };
  } catch {
    return { authenticated: false };
  }
}