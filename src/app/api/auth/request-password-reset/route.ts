import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { RequestPasswordResetUseCase } from '@/core/application/use-cases/customer/RequestPasswordResetUseCase';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { requestPasswordResetSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = requestPasswordResetSchema.parse(body);

    const useCase = container.resolve('requestPasswordResetUseCase') as RequestPasswordResetUseCase;
    await useCase.execute(email);

    return successResponse({
      message: 'Se o email existir em nossa base, você receberá instruções para redefinir sua senha.',
    });
  } catch (error) {
    return handleApiError(error, 'ao solicitar recuperação de senha', 'Erro ao processar solicitação');
  }
}