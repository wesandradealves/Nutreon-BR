import { NextRequest } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { handleApiError, successResponse } from '@/lib/api-utils';
import type { NuvemshopProduct } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Extrair parâmetros de query
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '30';
    const q = searchParams.get('q'); // busca
    const categoryId = searchParams.get('category_id');
    
    // Construir query string para Nuvemshop
    const queryParams = new URLSearchParams({
      page,
      per_page: perPage,
      ...(q && { q }),
      ...(categoryId && { category_id: categoryId }),
    });
    
    const products = await nuvemshopClient.get<NuvemshopProduct[]>(`/products?${queryParams}`);
    
    return successResponse(products, {
      meta: {
        page: parseInt(page),
        per_page: parseInt(perPage),
        total: products.length,
      }
    });
    
  } catch (error) {
    return handleApiError(error, 'ao buscar produtos');
  }
}