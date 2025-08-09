import { NextRequest } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { handleApiError, successResponse } from '@/lib/api-utils';
import type { NuvemshopProduct } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    // Validar query mínima
    if (!query || query.length < 2) {
      return successResponse([], {
        meta: {
          query,
          message: 'Query deve ter pelo menos 2 caracteres',
          total: 0
        }
      });
    }

    // Construir parâmetros para API Nuvemshop
    const queryParams = new URLSearchParams({
      q: query,
      published: 'true',
      per_page: '20',
      page: '1'
    });

    console.log(`[Search API] Buscando produtos com query: "${query}"`);
    
    // Usar cliente padrão do projeto
    const products = await nuvemshopClient.get<NuvemshopProduct[]>(`/products?${queryParams}`);
    
    // Filtrar apenas produtos publicados (redundante mas garante)
    const publishedProducts = products.filter(product => product.published);
    
    console.log(`[Search API] Encontrados ${publishedProducts.length} produtos`);

    return successResponse(publishedProducts, {
      meta: {
        query,
        total: publishedProducts.length,
        page: 1,
        per_page: 20
      }
    });
    
  } catch (error) {
    return handleApiError(error, 'ao buscar produtos');
  }
}