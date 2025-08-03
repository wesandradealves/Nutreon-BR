import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';

export async function GET(request: NextRequest) {
  try {
    // Obter token do cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'Não autenticado',
      }, { status: 401 });
    }

    // Verificar token
    const payload = await container.tokenService.verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'Token inválido',
      }, { status: 401 });
    }

    // Buscar cliente
    const customer = await container.customerRepository.findById(payload.customerId);
    
    if (!customer) {
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'Cliente não encontrado',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
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
    });
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
    
    return NextResponse.json({
      success: false,
      authenticated: false,
      error: 'Erro ao buscar dados do cliente',
    }, { status: 500 });
  }
}