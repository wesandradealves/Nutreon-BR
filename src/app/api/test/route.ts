import { NextResponse } from 'next/server';

export async function GET() {
  console.log('\n🧪 [TEST] ==> GET /api/test');
  
  // Usar token e user ID diretamente do ambiente
  const token = process.env.NUVEMSHOP_ACCESS_TOKEN;
  const userId = process.env.NEXT_PUBLIC_NUVEMSHOP_USER_ID || process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID;
  
  console.log(`🔐 [TEST] Token: ${token ? '✅ Presente' : '❌ Ausente'}`);
  console.log(`🏪 [TEST] User ID: ${userId || 'N/A'}`);
  
  if (!token || !userId) {
    return NextResponse.json({
      success: false,
      error: 'Token ou User ID não configurado',
      config: {
        hasToken: !!token,
        hasUserId: !!userId,
      }
    });
  }
  
  try {
    const url = `https://api.tiendanube.com/v1/${userId}/store`;
    console.log(`🌐 [TEST] Chamando: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authentication': `bearer ${token}`,
        'User-Agent': 'Nutreon/1.0.0',
      },
    });
    
    console.log(`📊 [TEST] Status: ${response.status}`);
    
    if (!response.ok) {
      const error = await response.text();
      console.log(`❌ [TEST] Erro:`, error);
      return NextResponse.json({
        success: false,
        error: `API Error ${response.status}`,
        details: error,
      });
    }
    
    const data = await response.json();
    console.log(`✅ [TEST] Sucesso! Loja: ${data.name?.pt || data.name}`);
    
    return NextResponse.json({
      success: true,
      data: {
        name: data.name,
        email: data.email,
        id: data.id,
      }
    });
    
  } catch (error) {
    console.error('💥 [TEST] Erro:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}