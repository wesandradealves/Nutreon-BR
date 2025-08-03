import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { requireAuth } from '@/core/infrastructure/middleware/authMiddleware';
import { z } from 'zod';

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
    
    return NextResponse.json({
      success: true,
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
    console.error('Erro ao atualizar cliente:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: error.errors[0].message,
      }, { status: 400 });
    }
    
    const message = error instanceof Error ? error.message : 'Erro ao atualizar dados';
    const status = message.includes('não encontrado') ? 404 : 
                   message.includes('Não autenticado') ? 401 : 400;
    
    return NextResponse.json({
      success: false,
      error: message,
    }, { status });
  }
}