import { NextResponse } from 'next/server';

export async function GET() {
  const appId = process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID || '20076';
  
  return NextResponse.json({
    step1: "Acesse o painel de parceiros",
    url_parceiros: "https://partners.nuvemshop.com.br",
    
    step2: "Instale o app em uma loja de teste",
    url_instalacao: `https://www.tiendanube.com/apps/${appId}/authorize`,
    
    step3: "Após autorizar, você será redirecionado para:",
    callback_url: "http://localhost:3000/api/callback",
    
    step4: "O token será exibido no console do servidor",
    
    importante: [
      "O código de autorização expira em 5 minutos",
      "O token gerado não expira",
      "Guarde o token no .env.local para uso permanente"
    ]
  });
}