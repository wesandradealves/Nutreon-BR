import { NextResponse } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import type { NuvemshopCategory } from '@/types';

export async function GET() {
  console.log('\n🎯 [BFF] ==> GET /api/categories');
  
  try {
    console.log('🚀 [BFF] Buscando categorias...');
    const categories = await nuvemshopClient.get<NuvemshopCategory[]>('/categories');
    
    console.log(`✅ [BFF] ${categories.length} categorias encontradas`);
    
    // Log das categorias principais
    const mainCategories = categories.filter((cat) => !cat.parent);
    console.log(`📂 [BFF] Categorias principais: ${mainCategories.length}`);
    mainCategories.forEach((cat) => {
      const name = typeof cat.name === 'string' ? cat.name : cat.name?.pt || 'Sem nome';
      console.log(`  📁 ${name} (ID: ${cat.id})`);
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