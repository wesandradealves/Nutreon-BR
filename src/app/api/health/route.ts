import { NextResponse } from 'next/server';
import { tokenManager } from '@/lib/nuvemshop-token-manager';

export async function GET() {
  console.log('\n🏥 [BFF] ==> GET /api/health');
  console.log('🔍 [BFF] Verificando saúde do sistema...');
  
  try {
    console.log('🔐 [BFF] Verificando token...');
    const token = await tokenManager.getToken();
    const userId = await tokenManager.getUserId();
    
    const hasToken = !!token;
    const hasUserId = !!userId;
    
    console.log(`📊 [BFF] Status do sistema:`);
    console.log(`  ✅ Token disponível: ${hasToken ? 'SIM' : 'NÃO'}`);
    console.log(`  ✅ User ID disponível: ${hasUserId ? 'SIM' : 'NÃO'}`);
    console.log(`  🌍 Ambiente: ${process.env.NODE_ENV}`);
    console.log(`  🏪 Store ID: ${process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID || 'N/A'}`);
    
    let tokenValid = false;
    if (token) {
      console.log('🔍 [BFF] Validando token com a API...');
      tokenValid = await tokenManager.validateToken(token);
    }
    
    const status = hasToken && hasUserId && tokenValid ? 'healthy' : 'unhealthy';
    const statusEmoji = status === 'healthy' ? '💚' : '💔';
    
    console.log(`\n${statusEmoji} [BFF] Status final: ${status.toUpperCase()}`);
    
    return NextResponse.json({
      success: true,
      data: {
        status,
        checks: {
          token: hasToken,
          userId: hasUserId,
          tokenValid,
          environment: process.env.NODE_ENV,
        },
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ [BFF] Erro ao verificar saúde:', error);
    return NextResponse.json(
      { 
        success: false,
        data: { status: 'error' },
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}