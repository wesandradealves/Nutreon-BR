import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { LogoutCustomerUseCase } from '@/core/application/use-cases/customer/LogoutCustomerUseCase';
import { cookies } from 'next/headers';
import { successResponse, handleApiError } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get('auth-token')?.value;
    
    const authHeader = request.headers.get('Authorization');
    const tokenFromHeader = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    const token = tokenFromCookie || tokenFromHeader;
    
    if (token) {
      try {
        const useCase = container.resolve('logoutCustomerUseCase') as LogoutCustomerUseCase;
        await useCase.execute(token);
      } catch (error) {
        console.error('Erro ao desativar sessão:', error);
      }
    }

    const response = successResponse({ message: 'Logout realizado com sucesso' });
    response.cookies.delete('auth-token');

    return response;
  } catch (error) {
    return handleApiError(error, 'ao fazer logout');
  }
}