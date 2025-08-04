import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { requireAuth } from '@/core/infrastructure/middleware/authMiddleware';
import { z } from 'zod';
import { successResponse, handleApiError } from '@/lib/api-utils';

const updateCustomerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().optional(),
});

export async function PUT(request: NextRequest) {
  try {
    // Verificar autenticação
    const auth = await requireAuth(request);
    
    const body = await request.json();
    const validatedData = updateCustomerSchema.parse(body);
    
    await container.updateCustomerUseCase.execute({
      customerId: auth.customerId,
      ...validatedData,
    });

    // Buscar dados atualizados
    const updatedCustomer = await container.customerRepository.findById(auth.customerId);
    
    return successResponse({
      message: 'Dados atualizados com sucesso',
      customer: updatedCustomer ? {
        id: updatedCustomer.id,
        email: updatedCustomer.email.value,
        name: updatedCustomer.name,
        phone: updatedCustomer.phone?.value,
        verified: updatedCustomer.verified,
      } : null,
    });
  } catch (error) {
    return handleApiError(error, 'ao atualizar cliente', 'Erro ao atualizar dados');
  }
}