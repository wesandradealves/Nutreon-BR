import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { ResetPasswordUseCase } from '@/core/application/use-cases/customer/ResetPasswordUseCase';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { resetPasswordSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const useCase = container.resolve('resetPasswordUseCase') as ResetPasswordUseCase;
    await useCase.execute(token, password);

    return successResponse({
      message: 'Senha redefinida com sucesso',
    });
  } catch (error) {
    return handleApiError(error, 'ao redefinir senha', 'Erro ao redefinir senha');
  }
}