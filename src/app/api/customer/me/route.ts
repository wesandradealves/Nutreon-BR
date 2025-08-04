import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return errorResponse('Não autenticado', 401);
    }

    const payload = await container.tokenService.verifyToken(token);
    
    if (!payload) {
      return errorResponse('Token inválido', 401);
    }

    const customer = await container.customerRepository.findById(payload.customerId);
    
    if (!customer) {
      return errorResponse('Cliente não encontrado', 404);
    }

    const customerData = {
      authenticated: true,
      customer: {
        id: customer.id,
        email: customer.email.value,
        name: customer.name,
        phone: customer.phone?.value,
        verified: customer.verified,
        addresses: customer.addresses.map((addr) => ({
          id: addr.id,
          street: addr.street,
          number: addr.number,
          complement: addr.complement,
          neighborhood: addr.neighborhood,
          city: addr.city,
          state: addr.state,
          zipCode: addr.zipCode,
          country: addr.country,
          isDefault: addr.isDefault,
        })),
      },
    };

    return successResponse(customerData);
  } catch (error) {
    return handleApiError(error, 'ao buscar dados do cliente');
  }
}