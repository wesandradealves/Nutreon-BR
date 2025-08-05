import { container } from '@/core/infrastructure/container';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { cookies } from 'next/headers';
import { COOKIES } from '@/utils/constants';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.AUTH_TOKEN)?.value;
    
    // Se tem token, invalida a sessão no banco
    if (token) {
      try {
        // Busca a sessão pelo token
        const session = await container.prisma.session.findUnique({
          where: { token }
        });
        
        if (session) {
          // Deleta a sessão completamente
          await container.prisma.session.delete({
            where: { id: session.id }
          });
          console.log('[Logout] Sessão deletada:', session.id);
        }
      } catch (error) {
        console.error('[Logout] Erro ao invalidar sessão:', error);
        // Continua com o logout mesmo se falhar
      }
    }
    
    const response = successResponse({ message: 'Logout realizado com sucesso' });
    
    // Remove todos os cookies de autenticação
    response.cookies.delete(COOKIES.AUTH_TOKEN);
    response.cookies.delete('nuvemshop_token');
    response.cookies.delete('nuvemshop_user_id');
    
    return response;
  } catch (error) {
    return handleApiError(error, 'Erro ao realizar logout');
  }
}