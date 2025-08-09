import { container } from '@/core/infrastructure/container';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/config/constants';
import { COOKIES } from '@/utils/constants';

// POST /api/cart/sync - Sincronizar carrinho ao fazer login
export async function POST() {
  try {
    // Verifica se está autenticado
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAMES.AUTH_TOKEN)?.value;
    
    if (!token) {
      return errorResponse('Não autorizado', 401);
    }

    let customerId: string;
    try {
      const payload = await container.tokenService.verifyToken(token);
      if (payload) {
        customerId = payload.customerId;
      } else {
        return errorResponse('Token inválido', 401);
      }
    } catch {
      return errorResponse('Token inválido', 401);
    }

    // Obtém sessionId do cookie
    const sessionId = cookieStore.get(COOKIES.CART_SESSION)?.value;
    
    if (!sessionId) {
      // Não há carrinho de sessão para sincronizar
      return successResponse({ message: 'Nenhum carrinho para sincronizar' });
    }

    // Executa sincronização
    await container.syncCartUseCase.execute({
      sessionId,
      customerId,
    });

    // Remove cookie de sessão após sincronizar
    cookieStore.delete(COOKIES.CART_SESSION);

    return successResponse({ message: 'Carrinho sincronizado com sucesso' });
  } catch (error) {
    return handleApiError(error, 'Erro ao sincronizar carrinho');
  }
}