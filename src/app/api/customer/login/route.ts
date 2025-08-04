import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { loginCustomerSchema } from '@/core/infrastructure/validation/schemas';
import { handleApiError, responseWithCookie } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = loginCustomerSchema.parse(body);
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'IP não disponível';
    const userAgent = request.headers.get('user-agent') || 'Navegador não identificado';
    
    const result = await container.authenticateCustomerUseCase.execute(validatedData, {
      ipAddress,
      userAgent,
    });
    
    return responseWithCookie(
      result,
      'auth-token',
      result.token,
      { maxAge: 60 * 60 * 24 * 7 } // 7 dias
    );
  } catch (error) {
    return handleApiError(error, 'ao autenticar cliente');
  }
}