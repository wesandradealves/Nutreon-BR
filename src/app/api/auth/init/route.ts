import { NextResponse } from 'next/server';

export async function GET() {
  // Gerar URL de autorização OAuth
  const clientId = process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID || '';
  const state = Math.random().toString(36).substring(7);
  
  const authUrl = `https://www.tiendanube.com/apps/${clientId}/authorize?state=${state}`;
  
  return NextResponse.json({
    message: 'Para autorizar o BFF, acesse a URL abaixo:',
    authUrl,
    instructions: [
      '1. Copie e cole a URL no navegador',
      '2. Autorize o aplicativo',
      '3. Você será redirecionado e o token será salvo automaticamente',
      '4. O BFF funcionará com o novo token'
    ]
  });
}