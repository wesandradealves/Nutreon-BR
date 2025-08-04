import { NextRequest } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { handleApiError, successResponse } from '@/lib/api-utils';
import type { NuvemshopProduct } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await nuvemshopClient.get<NuvemshopProduct>(`/products/${id}`);
    
    return successResponse(product);
    
  } catch (error) {
    return handleApiError(error, 'ao buscar produto');
  }
}