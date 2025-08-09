import { NextRequest } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { handleApiError, successResponse } from '@/lib/api-utils';
import type { NuvemshopProduct } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    
    if (!handle) {
      return successResponse(null, {
        error: 'Handle do produto é obrigatório',
        status: 400
      });
    }

    const products = await nuvemshopClient.get<NuvemshopProduct[]>(`/products?handle=${handle}&per_page=1`);

    if (!products || products.length === 0) {
      return successResponse(null, {
        error: 'Produto não encontrado',
        status: 404
      });
    }

    const product = products[0];

    if (!product.published) {
      return successResponse(null, {
        error: 'Produto não disponível',
        status: 404
      });
    }

    return successResponse(product);
  } catch (error) {
    return handleApiError(error, 'products/[handle]');
  }
}