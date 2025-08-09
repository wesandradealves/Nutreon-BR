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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #e5e5e5;
          background-color: #171717;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #262626;
          overflow: hidden;
        }
        .header {
          background-color: #171717;
          padding: 40px 30px;
          text-align: center;
          border-bottom: 2px solid #00e8d4;
        }
        .logo {
          margin-bottom: 20px;
        }
        .logo img {
          width: 160px;
          height: auto;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          color: #ffffff;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0;
          font-size: 16px;
          color: #a3a3a3;
        }
        .content {
          padding: 40px 30px;
          background-color: #262626;
        }
        .greeting {
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .text {
          color: #d4d4d4;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 16px 40px;
          background-color: #00e8d4;
          color: #171717;
          text-decoration: none;
          border-radius: 8px;
          margin: 20px 0;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .button:hover {
          background-color: #00b8a9;
        }
        .warning-box {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .warning-box p {
          color: #92400e;
          margin: 0;
          font-weight: 500;
        }
        .benefits {
          background-color: #171717;
          padding: 30px;
          border-radius: 8px;
          margin: 30px 0;
          border: 1px solid #404040;
        }
        .benefits h3 {
          color: #00e8d4;
          margin-top: 0;
          font-size: 20px;
        }
        .benefits ul {
          margin: 10px 0;
          padding-left: 0;
          list-style: none;
        }
        .benefits li {
          color: #d4d4d4;
          padding: 8px 0;
          padding-left: 30px;
          position: relative;
        }
        .benefits li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #00e8d4;
          font-weight: bold;
          font-size: 18px;
        }
        .footer {
          background-color: #171717;
          padding: 30px;
          text-align: center;
          font-size: 14px;
          color: #a3a3a3;
          border-top: 1px solid #404040;
        }
        .footer a {
          color: #00e8d4;
          text-decoration: none;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #d4d4d4;
          text-decoration: none;
        }
        .center {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="${process.env.NEXT_PUBLIC_APP_URL}/img/logo.PNG" alt="Nutreon" />
          </div>
          <h1>Bem-vindo à Nutreon!</h1>
          <p>Nutrindo Saúde, Transformando Vidas</p>
        </div>
        
        <div class="content">
          <h2 class="greeting">Olá, ${customerName}!</h2>
          
          <p class="text">É com grande prazer que damos as boas-vindas a você ao ecossistema Nutreon!</p>
          
          ${verificationLink ? `
          <div class="warning-box">
            <p><strong>⚠️ Importante:</strong> Para ativar sua conta e começar a fazer compras, você precisa verificar seu email.</p>
            <div class="center" style="margin-top: 15px;">
              <a href="${verificationLink}" class="button" style="background-color: #f59e0b; color: #92400e;">
                Verificar Email Agora
              </a>
            </div>
          </div>
          ` : ''}
          
          <p class="text">Sua conta foi criada com sucesso e ${verificationLink ? 'após a verificação você terá' : 'agora você tem'} acesso a:</p>
          
          <div class="benefits">
            <h3>Benefícios Exclusivos</h3>
            <ul>
              <li>Mais de 60 refeições congeladas nutritivas</li>
              <li>Kits personalizáveis "Seja Chef"</li>
              <li>Linha completa de suplementos</li>
              <li>Consultoria nutricional especializada</li>
              <li>Frete grátis em compras acima de R$ 200</li>
              <li>Ofertas e promoções exclusivas</li>
            </ul>
          </div>
          
          <p class="text">Que tal começar explorando nossos produtos mais vendidos?</p>
          
          <div class="center">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">
              Explorar Produtos
            </a>
          </div>
          
          <p class="text">Se tiver qualquer dúvida, nossa equipe está sempre pronta para ajudar!</p>
          
          <p class="text">Atenciosamente,<br>
          <strong style="color: #ffffff;">Equipe Nutreon</strong></p>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="https://www.facebook.com/nutreon">Facebook</a>
            <a href="https://www.instagram.com/nutreon">Instagram</a>
            <a href="https://www.youtube.com/nutreon">YouTube</a>
          </div>
          <p>Este email foi enviado para ${customerName} porque você se cadastrou em nossa loja.</p>
          <p>© ${new Date().getFullYear()} Nutreon. Todos os direitos reservados.</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/politica-de-privacidade">Política de Privacidade</a> | 
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/termos-de-uso">Termos de Uso</a>
          </p>
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