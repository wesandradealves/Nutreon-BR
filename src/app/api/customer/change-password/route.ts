import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { requireAuth } from '@/core/infrastructure/middleware/authMiddleware';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { changePasswordSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const auth = await requireAuth(request);
    
    const body = await request.json();
    const validatedData = changePasswordSchema.parse(body);
    
    await container.changePasswordUseCase.execute({
      customerId: auth.customerId,
      currentPassword: validatedData.currentPassword,
      newPassword: validatedData.newPassword,
    });
    
    // Criar resposta que remove o cookie (forçar logout)
    const response = successResponse({
      message: 'Senha alterada com sucesso. Faça login novamente.',
    });
    
    // Remover cookie de autenticação
    response.cookies.delete('auth-token');
    
    return response;
  } catch (error) {
    return handleApiError(error, 'ao alterar senha', 'Erro ao alterar senha');
  }
}