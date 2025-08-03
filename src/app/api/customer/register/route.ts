import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { handleApiRoute, createApiError } from '@/core/infrastructure/middleware/errorHandler';
import { registerCustomerSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  return handleApiRoute(async () => {
    const body = await request.json();
    
    // Validar entrada
    const validatedData = registerCustomerSchema.parse(body);
    
    try {
      const result = await container.registerCustomerUseCase.execute(validatedData);
      return {
        ...result,
        message: 'Cliente cadastrado com sucesso',
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('já cadastrado')) {
        throw createApiError(error.message, 409);
      }
      throw error;
    }
  });
}