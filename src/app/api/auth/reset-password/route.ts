import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { container } from '@/core/infrastructure/container';
import { ResetPasswordUseCase } from '@/core/application/use-cases/customer/ResetPasswordUseCase';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const useCase = container.resolve('resetPasswordUseCase') as ResetPasswordUseCase;
    await useCase.execute(token, password);

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Dados inválidos',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes('expirado') || error.message.includes('inválido')) {
        return NextResponse.json(
          { 
            success: false,
            error: error.message 
          },
          { status: 400 }
        );
      }
    }

    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao redefinir senha' 
      },
      { status: 500 }
    );
  }
}