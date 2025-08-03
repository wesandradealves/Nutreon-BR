import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

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
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(tokenData.error || 'token_error')}`, request.url)
      );
    }

    // Criar resposta com redirect para home
    const response = NextResponse.redirect(new URL('/', request.url));
    
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