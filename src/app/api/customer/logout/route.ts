import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { LogoutCustomerUseCase } from '@/core/application/use-cases/customer/LogoutCustomerUseCase';
import { cookies } from 'next/headers';
import { handleApiError } from '@/lib/api-utils';
import { COOKIE_NAMES } from '@/config/constants';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get(COOKIE_NAMES.AUTH_TOKEN)?.value;
    
    const authHeader = request.headers.get('Authorization');
    const tokenFromHeader = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    const token = tokenFromCookie || tokenFromHeader;
    
    if (token) {
      console.log('[Logout] Token encontrado:', token.substring(0, 20) + '...');
      try {
        // Usar o use case mas garantir que delete
        const useCase = container.resolve('logoutCustomerUseCase') as LogoutCustomerUseCase;
        await useCase.execute(token);
        console.log('[Logout] UseCase executado');
        
        // Forçar deleção completa (não apenas desativar)
        const result = await container.prisma.session.deleteMany({
          where: { token }
        });
        console.log('[Logout] Sessões deletadas:', result.count);
      } catch (error) {
        console.error('[Logout] Erro ao processar logout:', error);
      }
    } else {
      console.log('[Logout] Nenhum token encontrado');
    }

    // Criar resposta com cookies deletados
    const response = NextResponse.json({
      success: true,
      data: { message: 'Logout realizado com sucesso' },
      timestamp: new Date().toISOString()
    });
    
    // Deletar o cookie corretamente
    console.log('[Logout] Deletando cookie:', COOKIE_NAMES.AUTH_TOKEN);
    response.cookies.set(COOKIE_NAMES.AUTH_TOKEN, '', {
      expires: new Date(0),
      path: '/'
    });

    return response;
  } catch (error) {
    return handleApiError(error, 'ao fazer logout');
  }
}