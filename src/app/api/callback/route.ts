import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Se houver erro, redirecionar com mensagem
    if (error) {
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Se não houver código, erro
    if (!code) {
      return NextResponse.redirect(
        new URL('/auth?error=no_code', request.url)
      );
    }

    // Trocar código por token diretamente no servidor
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Erro ao obter token:', tokenData);
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(tokenData.error || 'token_error')}`, request.url)
      );
    }

    // Salvar token e user_id no .env.local ou em um banco de dados
    // Por enquanto, vamos apenas logar e redirecionar
    console.log('Token obtido com sucesso:', {
      access_token: tokenData.access_token,
      user_id: tokenData.user_id,
      scope: tokenData.scope
    });

    // Criar resposta com redirect
    const response = NextResponse.redirect(new URL('/auth?success=true', request.url));
    
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

    // Log para desenvolvimento
    console.log('\n🎉 Autenticação bem-sucedida!');
    console.log('📦 Store ID:', tokenData.user_id);
    console.log('🔑 Access Token:', tokenData.access_token);
    console.log('📋 Scopes:', tokenData.scope);
    console.log('\nAtualize seu .env.local com:');
    console.log(`NUVEMSHOP_ACCESS_TOKEN=${tokenData.access_token}`);
    console.log(`NEXT_PUBLIC_NUVEMSHOP_STORE_ID=${tokenData.user_id}\n`);

    return response;

  } catch (error) {
    console.error('Erro no callback OAuth:', error);
    return NextResponse.redirect(
      new URL('/auth?error=server_error', request.url)
    );
  }
}