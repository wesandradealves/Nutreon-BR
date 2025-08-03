import { NextResponse } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';

export async function GET() {
  console.log('\n🎯 [BFF] ==> GET /api/categories');
  
  try {
    console.log('🚀 [BFF] Buscando categorias...');
    const categories = await nuvemshopClient.get('/categories');
    
    console.log(`✅ [BFF] ${categories.length} categorias encontradas`);
    
    // Log das categorias principais
    const mainCategories = categories.filter((cat: { parent: number | null }) => !cat.parent);
    console.log(`📂 [BFF] Categorias principais: ${mainCategories.length}`);
    mainCategories.forEach((cat: { name?: { pt?: string } | string; id: number }) => {
      console.log(`  📁 ${cat.name?.pt || cat.name} (ID: ${cat.id})`);
    });
    
    return NextResponse.json({
      success: true,
      data: categories,
      meta: {
        total: categories.length,
        main_categories: mainCategories.length,
        timestamp: new Date().toISOString(),
      }
    });
    
  } catch (error) {
    console.error('❌ [BFF] Erro ao buscar categorias:', error);
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