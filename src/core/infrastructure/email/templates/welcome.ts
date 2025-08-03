export const welcomeEmailTemplate = (customerName: string, verificationLink?: string) => ({
  subject: 'Bem-vindo à Nutreon! 🎉',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bem-vindo à Nutreon</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #16a34a;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #16a34a;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          background-color: #f8f8f8;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .benefits {
          background-color: #f0fdf4;
          padding: 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .benefits ul {
          margin: 10px 0;
          padding-left: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bem-vindo à Nutreon!</h1>
        </div>
        
        <div class="content">
          <h2>Olá, ${customerName}!</h2>
          
          <p>É com grande prazer que damos as boas-vindas a você em nossa loja de suplementos!</p>
          
          ${verificationLink ? `
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Importante:</strong> Para ativar sua conta e começar a fazer compras, você precisa verificar seu email.</p>
            <div style="text-align: center; margin-top: 15px;">
              <a href="${verificationLink}" class="button" style="background-color: #f59e0b;">
                Verificar Email Agora
              </a>
            </div>
          </div>
          ` : ''}
          
          <p>Sua conta foi criada com sucesso e ${verificationLink ? 'após a verificação você terá' : 'agora você tem'} acesso a:</p>
          
          <div class="benefits">
            <ul>
              <li>🛒 Compras rápidas e seguras</li>
              <li>📦 Acompanhamento de pedidos em tempo real</li>
              <li>💰 Ofertas exclusivas para clientes</li>
              <li>🎯 Recomendações personalizadas</li>
              <li>📧 Novidades e promoções em primeira mão</li>
            </ul>
          </div>
          
          <p>Que tal começar explorando nossos produtos mais vendidos?</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/produtos" class="button">
              Explorar Produtos
            </a>
          </div>
          
          <p>Se tiver qualquer dúvida, nossa equipe está sempre pronta para ajudar!</p>
          
          <p>Atenciosamente,<br>
          <strong>Equipe Nutreon</strong></p>
        </div>
        
        <div class="footer">
          <p>Este email foi enviado para ${customerName} porque você se cadastrou em nossa loja.</p>
          <p>© ${new Date().getFullYear()} Nutreon. Todos os direitos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Bem-vindo à Nutreon!
    
    Olá, ${customerName}!
    
    É com grande prazer que damos as boas-vindas a você em nossa loja de suplementos!
    
    ${verificationLink ? `
    IMPORTANTE: Para ativar sua conta, você precisa verificar seu email.
    Acesse: ${verificationLink}
    
    ` : ''}
    Sua conta foi criada com sucesso e ${verificationLink ? 'após a verificação você terá' : 'agora você tem'} acesso a:
    - Compras rápidas e seguras
    - Acompanhamento de pedidos em tempo real
    - Ofertas exclusivas para clientes
    - Recomendações personalizadas
    - Novidades e promoções em primeira mão
    
    Acesse: ${process.env.NEXT_PUBLIC_APP_URL}/produtos
    
    Atenciosamente,
    Equipe Nutreon
  `
});