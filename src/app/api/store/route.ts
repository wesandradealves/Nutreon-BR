import { nuvemshopClient } from '@/lib/nuvemshop-client';
import { successResponse, handleApiError } from '@/lib/api-utils';
import type { NuvemshopStore } from '@/types';

export async function GET() {
  console.log('\n🎯 [BFF] ==> GET /api/store');
  console.log('🏪 [BFF] Buscando informações da loja...');
  
  try {
    console.log('🚀 [BFF] Chamando endpoint /store...');
    const store = await nuvemshopClient.get<NuvemshopStore>('/store');
    
    const storeName = typeof store.name === 'string' ? store.name : store.name?.pt || 'Sem nome';
    console.log(`✅ [BFF] Loja: ${storeName}`);
    console.log(`📧 [BFF] Email: ${store.email}`);
    console.log(`🌍 [BFF] País: ${store.country}`);
    console.log(`💼 [BFF] Plano: ${store.plan_name || 'N/A'}`);
    console.log(`🏢 [BFF] CNPJ: ${store.business_id || 'N/A'}`);
    
    return successResponse(store);
  } catch (error) {
    return handleApiError(error, 'ao buscar informações da loja');
  }
}