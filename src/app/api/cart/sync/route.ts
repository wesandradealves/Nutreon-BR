import { container } from '@/core/infrastructure/container';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';
import { cookies } from 'next/headers';

const CART_SESSION_COOKIE = 'nutreon_cart_session';

// POST /api/cart/sync - Sincronizar carrinho ao fazer login
export async function POST() {
  try {
    // Verifica se está autenticado
    const cookieStore = await cookies();
    const token = cookieStore.get('nutreon-auth-token')?.value;
    
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
    const sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
    
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
    cookieStore.delete(CART_SESSION_COOKIE);

    return successResponse({ message: 'Carrinho sincronizado com sucesso' });
  } catch (error) {
    return handleApiError(error, 'Erro ao sincronizar carrinho');
  }
}