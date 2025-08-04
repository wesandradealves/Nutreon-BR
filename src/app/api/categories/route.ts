import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { handleApiError, successResponse } from '@/lib/api-utils';
import type { NuvemshopCategory } from '@/types';

export async function GET() {
  try {
    const categories = await nuvemshopClient.get<NuvemshopCategory[]>('/categories');
    
    const mainCategories = categories.filter((cat) => !cat.parent);
    
    return successResponse(categories, {
      meta: {
        total: categories.length,
        main_categories: mainCategories.length,
      }
    });
    
  } catch (error) {
    return handleApiError(error, 'ao buscar categorias');
  }
}