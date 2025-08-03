import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { container } from '@/core/infrastructure/container';
import { RequestPasswordResetUseCase } from '@/core/application/use-cases/customer/RequestPasswordResetUseCase';

const requestPasswordResetSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = requestPasswordResetSchema.parse(body);

    const useCase = container.resolve('requestPasswordResetUseCase') as RequestPasswordResetUseCase;
    await useCase.execute(email);

    return NextResponse.json({
      success: true,
      message: 'Se o email existir em nossa base, você receberá instruções para redefinir sua senha.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email inválido' 
        },
        { status: 400 }
      );
    }

    console.error('Erro ao solicitar recuperação de senha:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao processar solicitação' 
      },
      { status: 500 }
    );
  }
}