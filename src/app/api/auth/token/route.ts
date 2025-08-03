import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Código de autorização não fornecido' },
        { status: 400 }
      );
    }

    // Fazer a requisição para trocar o código pelo token
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

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: tokenData.error || 'Erro ao obter token' },
        { status: tokenResponse.status }
      );
    }

    // Retornar o token para o cliente
    return NextResponse.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      scope: tokenData.scope,
      user_id: tokenData.user_id,
    });

  } catch (error) {
    console.error('Erro ao processar token:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}