import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { container } from '@/core/infrastructure/container';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);
    
    await container.verifyEmailUseCase.execute(token);

    return NextResponse.json({
      success: true,
      message: 'Email verificado com sucesso! Você já pode fazer login.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Token inválido' 
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      const errorMessage = error.message;
      const statusCode = 
        errorMessage.includes('expirado') ? 400 :
        errorMessage.includes('já foi verificado') ? 400 :
        errorMessage.includes('inválido') ? 404 :
        500;

      return NextResponse.json(
        { 
          success: false,
          error: errorMessage 
        },
        { status: statusCode }
      );
    }

    console.error('Erro ao verificar email:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao verificar email' 
      },
      { status: 500 }
    );
  }
}