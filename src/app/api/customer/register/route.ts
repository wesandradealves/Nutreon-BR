import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { handleApiError, successResponse } from '@/lib/api-utils';
import { registerCustomerSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar entrada
    const validatedData = registerCustomerSchema.parse(body);
    
    const result = await container.registerCustomerUseCase.execute(validatedData);
    
    return successResponse({
      ...result,
      message: 'Cliente cadastrado com sucesso',
    });
  } catch (error) {
    return handleApiError(error, 'ao cadastrar cliente');
  }
}