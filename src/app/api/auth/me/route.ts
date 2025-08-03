import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('nuvemshop_token');
    const userId = cookieStore.get('nuvemshop_user_id');

    if (!token || !userId) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Verificar se o token é válido fazendo uma requisição de teste
    const testResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL}/${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION}/${userId.value}/store`,
      {
        headers: {
          'Authentication': `bearer ${token.value}`,
          'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
        },
      }
    );

    if (!testResponse.ok) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const storeData = await testResponse.json();

    return NextResponse.json({
      authenticated: true,
      user_id: userId.value,
      store: storeData,
    });

  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}