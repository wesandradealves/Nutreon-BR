import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { requireAuth } from '@/core/infrastructure/middleware/authMiddleware';
import { z } from 'zod';
import { successResponse, handleApiError } from '@/lib/api-utils';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

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