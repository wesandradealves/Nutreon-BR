import { NextResponse } from 'next/server';
import { tokenManager } from '@/lib/nuvemshop-token-manager';

export async function GET() {
  console.log('\n🔍 [DEBUG] ==> GET /api/debug');
  console.log('🔍 [DEBUG] Verificando configuração...');
  
  try {
    const token = await tokenManager.getToken();
    const userId = await tokenManager.getUserId();
    
    console.log('\n📋 [DEBUG] Variáveis de ambiente:');
    console.log(`  NUVEMSHOP_ACCESS_TOKEN: ${process.env.NUVEMSHOP_ACCESS_TOKEN ? '✅ Configurado' : '❌ Não configurado'}`);
    console.log(`  NEXT_PUBLIC_NUVEMSHOP_USER_ID: ${process.env.NEXT_PUBLIC_NUVEMSHOP_USER_ID || 'N/A'}`);
    console.log(`  NEXT_PUBLIC_NUVEMSHOP_STORE_ID: ${process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID || 'N/A'}`);
    console.log(`  NEXT_PUBLIC_NUVEMSHOP_API_URL: ${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL || 'N/A'}`);
    console.log(`  NEXT_PUBLIC_NUVEMSHOP_API_VERSION: ${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION || 'N/A'}`);
    
    console.log('\n🔐 [DEBUG] Token e User ID:');
    console.log(`  Token: ${token ? token.substring(0, 20) + '...' : 'N/A'}`);
    console.log(`  User ID: ${userId || 'N/A'}`);
    
    if (token && userId) {
      console.log('\n🌐 [DEBUG] Testando API com token...');
      const testUrl = `${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL}/${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION}/${userId}/store`;
      console.log(`  URL de teste: ${testUrl}`);
      
      const response = await fetch(testUrl, {
        headers: {
          'Authentication': `bearer ${token}`,
          'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
        },
      });
      
      console.log(`  Status da resposta: ${response.status}`);
      console.log(`  Headers da resposta:`, Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`  ❌ Erro da API:`, errorText);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        hasToken: !!token,
        hasUserId: !!userId,
        tokenPreview: token ? token.substring(0, 20) + '...' : null,
        userId,
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          hasAccessToken: !!process.env.NUVEMSHOP_ACCESS_TOKEN,
          apiUrl: process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL,
          apiVersion: process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION,
        }
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ [DEBUG] Erro:', error);
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