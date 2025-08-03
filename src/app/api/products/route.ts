import { NextRequest, NextResponse } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import type { NuvemshopProduct } from '@/types';

export async function GET(request: NextRequest) {
  console.log('\n🎯 [BFF] ==> GET /api/products');
  console.log('🔍 [BFF] Query params:', request.nextUrl.searchParams.toString());
  
  try {
    // Extrair parâmetros de query
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '30';
    const q = searchParams.get('q'); // busca
    const categoryId = searchParams.get('category_id');
    
    console.log('📊 [BFF] Parâmetros processados:', { page, perPage, q, categoryId });
    
    // Construir query string para Nuvemshop
    const queryParams = new URLSearchParams({
      page,
      per_page: perPage,
      ...(q && { q }),
      ...(categoryId && { category_id: categoryId }),
    });
    
    console.log('🚀 [BFF] Chamando Nuvemshop API...');
    const products = await nuvemshopClient.get<NuvemshopProduct[]>(`/products?${queryParams}`);
    
    console.log(`✅ [BFF] ${products.length} produtos recebidos`);
    const firstName = products[0]?.name?.pt || 'Sem nome';
    console.log('📦 [BFF] Primeiro produto:', firstName);
    
    return NextResponse.json({
      success: true,
      data: products,
      meta: {
        page: parseInt(page),
        per_page: parseInt(perPage),
        total: products.length,
        timestamp: new Date().toISOString(),
      }
    });
    
  } catch (error) {
    console.error('❌ [BFF] Erro ao buscar produtos:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}