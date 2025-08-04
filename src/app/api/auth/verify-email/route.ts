import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { responseWithCookie, handleApiError } from '@/lib/api-utils';
import { verifyEmailSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'IP não disponível';
    const userAgent = request.headers.get('user-agent') || 'Navegador não identificado';
    
    const result = await container.verifyEmailUseCase.execute(token, {
      ipAddress,
      userAgent,
    });
    
    // Retorna resposta com cookie de autenticação para login automático
    return responseWithCookie(
      {
        ...result,
        message: 'Email verificado com sucesso! Você foi conectado automaticamente.',
      },
      'auth-token',
      result.token,
      { maxAge: 60 * 60 * 24 * 7 } // 7 dias
    );
  } catch (error) {
    return handleApiError(error, 'ao verificar email', 'Erro ao verificar email');
  }
}