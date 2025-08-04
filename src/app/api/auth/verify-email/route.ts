import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { verifyEmailSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);
    
    await container.verifyEmailUseCase.execute(token);

    return successResponse({
      message: 'Email verificado com sucesso! Você já pode fazer login.',
    });
  } catch (error) {
    return handleApiError(error, 'ao verificar email', 'Erro ao verificar email');
  }
}