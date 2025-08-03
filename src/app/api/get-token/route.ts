import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('nuvemshop_token');
  const userIdCookie = cookieStore.get('nuvemshop_user_id');
  
  if (tokenCookie && userIdCookie) {
    console.log('\n🎉 TOKEN ENCONTRADO NOS COOKIES!');
    console.log('📋 Adicione ao seu .env.local:');
    console.log('\n');
    console.log(`NUVEMSHOP_ACCESS_TOKEN=${tokenCookie.value}`);
    console.log(`NEXT_PUBLIC_NUVEMSHOP_USER_ID=${userIdCookie.value}`);
    console.log('\n');
    
    return NextResponse.json({
      message: 'Token encontrado! Veja o console do servidor.',
      hasToken: true
    });
  }
  
  return NextResponse.json({
    message: 'Nenhum token encontrado nos cookies. Use /api/auth/init para gerar um novo.',
    hasToken: false
  });
}