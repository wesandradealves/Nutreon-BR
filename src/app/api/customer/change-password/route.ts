import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { requireAuth } from '@/core/infrastructure/middleware/authMiddleware';
import { z } from 'zod';

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
    const response = NextResponse.json({
      success: true,
      message: 'Senha alterada com sucesso. Faça login novamente.',
    });
    
    // Remover cookie de autenticação
    response.cookies.delete('auth-token');
    
    return response;
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: error.issues[0].message,
      }, { status: 400 });
    }
    
    const message = error instanceof Error ? error.message : 'Erro ao alterar senha';
    const status = message.includes('incorreta') ? 401 : 
                   message.includes('não encontrado') ? 404 : 
                   message.includes('Não autenticado') ? 401 : 400;
    
    return NextResponse.json({
      success: false,
      error: message,
    }, { status });
  }
}