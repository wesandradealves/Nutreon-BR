import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('nuvemshop_token');
  const userIdCookie = cookieStore.get('nuvemshop_user_id');
  
  console.log('\n🍪 ===== VERIFICANDO COOKIES =====');
  console.log('Token cookie:', tokenCookie ? '✅ Existe' : '❌ Não existe');
  console.log('User ID cookie:', userIdCookie ? '✅ Existe' : '❌ Não existe');
  
  if (tokenCookie) {
    console.log('\n📋 TOKEN ENCONTRADO! Adicione ao .env.local:');
    console.log(`NUVEMSHOP_ACCESS_TOKEN=${tokenCookie.value}`);
    console.log(`NEXT_PUBLIC_NUVEMSHOP_USER_ID=${userIdCookie?.value || '6551118'}`);
    console.log('================================\n');
    
    // Testar se o token funciona
    try {
      const response = await fetch(
        `https://api.tiendanube.com/v1/${userIdCookie?.value || '6551118'}/store`,
        {
          headers: {
            'Authentication': `bearer ${tokenCookie.value}`,
            'User-Agent': 'Nutreon/1.0.0',
          },
        }
      );
      
      if (response.ok) {
        const store = await response.json();
        console.log('✅ Token válido! Loja:', store.name?.pt || store.name);
      } else {
        console.log('❌ Token inválido:', response.status);
      }
    } catch (error) {
      console.log('❌ Erro ao testar token:', error);
    }
  }
  
  return NextResponse.json({
    hasToken: !!tokenCookie,
    hasUserId: !!userIdCookie,
    message: tokenCookie ? 
      'Token encontrado! Veja o terminal do servidor.' : 
      'Nenhum token nos cookies. Tente autorizar novamente.'
  });
}