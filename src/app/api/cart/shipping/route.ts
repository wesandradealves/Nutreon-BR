import { NextRequest } from 'next/server';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';
import { SHIPPING } from '@/utils/constants';

// POST /api/cart/shipping - Calcular frete
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { zipCode, subtotal } = body;

    if (!zipCode) {
      return errorResponse('CEP é obrigatório', 400);
    }

    if (!subtotal || subtotal < 0) {
      return errorResponse('Subtotal inválido', 400);
    }

    // Calcula frete baseado nas regras de negócio
    let shippingCost: number = SHIPPING.RATES.DEFAULT;

    if (subtotal >= SHIPPING.FREE_THRESHOLD) {
      shippingCost = 0; // Frete grátis
    } else if (subtotal >= SHIPPING.RATES.DISCOUNTED_MIN && subtotal <= SHIPPING.RATES.DISCOUNTED_MAX) {
      shippingCost = SHIPPING.RATES.DISCOUNTED;
    }

    // TODO: Integrar com API de cálculo de frete real (Correios, transportadoras, etc)
    // Por enquanto, retorna valores fixos baseados nas regras

    const shippingOptions = [
      {
        id: 'standard',
        name: 'Entrega Padrão',
        price: shippingCost,
        estimatedDays: 5,
      },
      {
        id: 'express',
        name: 'Entrega Expressa',
        price: shippingCost > 0 ? shippingCost + 10 : 10,
        estimatedDays: 2,
      },
    ];

    return successResponse({
      zipCode,
      subtotal,
      options: shippingOptions,
      selectedOption: shippingOptions[0],
    });
  } catch (error) {
    return handleApiError(error, 'Erro ao calcular frete');
  }
}