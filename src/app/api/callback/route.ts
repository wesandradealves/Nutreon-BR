import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('\n🔔 ===== CALLBACK OAUTH RECEBIDO =====');
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    console.log('📋 Parâmetros recebidos:');
    console.log('  Code:', code ? `${code.substring(0, 10)}...` : 'NENHUM');
    console.log('  Error:', error || 'NENHUM');

    // Se houver erro, redirecionar com mensagem
    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Se não houver código, erro
    if (!code) {
      return NextResponse.redirect(
        new URL('/?error=no_code', request.url)
      );
    }

    console.log('🔄 [OAuth] Trocando código por token...');
    console.log(`📝 Code: ${code}`);
    
    // Trocar código por token diretamente no servidor
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code: code,
    });
    
    console.log('🌐 [OAuth] Enviando para:', 'https://www.tiendanube.com/apps/authorize/token');
    
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(tokenData.error || 'token_error')}`, request.url)
      );
    }

    // Log para você copiar o token
    console.log('\n');
    console.log('🎉 ========== NOVO TOKEN GERADO ==========');
    console.log('📋 Copie e cole no seu .env.local:');
    console.log('\n');
    console.log(`NUVEMSHOP_ACCESS_TOKEN=${tokenData.access_token}`);
    console.log(`NEXT_PUBLIC_NUVEMSHOP_USER_ID=${tokenData.user_id}`);
    console.log('\n');
    console.log('🔄 Depois de atualizar o .env.local, reinicie o servidor!');
    console.log('=========================================\n');
    
    // Criar resposta com redirect para home
    const response = NextResponse.redirect(new URL('/?auth=success', request.url));
    
    // Salvar token em cookies seguros
    response.cookies.set('nuvemshop_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });
    
    response.cookies.set('nuvemshop_user_id', tokenData.user_id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    return response;

  } catch {
    return NextResponse.redirect(
      new URL('/?error=server_error', request.url)
    );
  }
}