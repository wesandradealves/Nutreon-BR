import { NextRequest, NextResponse } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`\n🎯 [BFF] ==> GET /api/products/${params.id}`);
  
  try {
    console.log('🚀 [BFF] Buscando produto específico...');
    const product = await nuvemshopClient.get(`/products/${params.id}`);
    
    console.log(`✅ [BFF] Produto encontrado: ${product.name?.pt || product.name}`);
    console.log(`💰 [BFF] Preço: R$ ${product.variants?.[0]?.price || 'N/A'}`);
    console.log(`📸 [BFF] ${product.images?.length || 0} imagens`);
    
    return NextResponse.json({
      success: true,
      data: product,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error(`❌ [BFF] Erro ao buscar produto ${params.id}:`, error);
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