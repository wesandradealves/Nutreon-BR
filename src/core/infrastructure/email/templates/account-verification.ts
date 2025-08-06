export const accountVerificationTemplate = (customerName: string, verificationLink: string) => ({
  subject: '✅ Verifique sua conta Nutreon',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verificar Conta - Nutreon</title>
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
          line-height: 1.6;
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
        .highlight-box {
          background-color: #171717;
          border: 2px solid #00e8d4;
          border-radius: 8px;
          padding: 30px;
          margin: 30px 0;
          text-align: center;
        }
        .highlight-box h3 {
          color: #00e8d4;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .steps {
          background-color: #171717;
          border: 1px solid #404040;
          border-radius: 8px;
          padding: 30px;
          margin: 30px 0;
        }
        .steps h3 {
          color: #00e8d4;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 20px;
        }
        .steps ol {
          margin: 0;
          padding-left: 20px;
        }
        .steps li {
          color: #d4d4d4;
          padding: 10px 0;
          line-height: 1.6;
        }
        .warning {
          color: #f59e0b;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
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
        .icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="${process.env.NEXT_PUBLIC_APP_URL}/img/logo.png" alt="Nutreon" />
          </div>
          <h1>Verificação de Conta</h1>
          <p>Nutrindo Saúde, Transformando Vidas</p>
        </div>
        
        <div class="content">
          <h2 class="greeting">Olá, ${customerName}!</h2>
          
          <p class="text">
            Obrigado por se cadastrar na Nutreon! Você está a apenas um clique de acessar 
            nosso ecossistema completo de nutrição e saúde.
          </p>
          
          <div class="highlight-box">
            <div class="icon">✉️</div>
            <h3>Verifique seu E-mail</h3>
            <p class="text" style="margin-bottom: 30px;">
              Para ativar sua conta e garantir a segurança de suas informações, 
              precisamos confirmar seu endereço de e-mail.
            </p>
            <a href="${verificationLink}" class="button">
              Verificar Meu E-mail
            </a>
          </div>
          
          <div class="steps">
            <h3>Por que verificar seu e-mail?</h3>
            <ol>
              <li>
                <strong style="color: #ffffff;">Segurança:</strong> 
                Protege sua conta contra acessos não autorizados
              </li>
              <li>
                <strong style="color: #ffffff;">Comunicação:</strong> 
                Garante que você receba atualizações importantes sobre seus pedidos
              </li>
              <li>
                <strong style="color: #ffffff;">Recuperação:</strong> 
                Permite recuperar sua senha caso esqueça
              </li>
              <li>
                <strong style="color: #ffffff;">Benefícios:</strong> 
                Habilita acesso a ofertas exclusivas e promoções especiais
              </li>
            </ol>
          </div>
          
          <p class="warning">
            ⏰ Este link de verificação expira em 24 horas
          </p>
          
          <p class="text" style="font-size: 14px; color: #a3a3a3;">
            Se você não criou uma conta na Nutreon, por favor ignore este e-mail. 
            Nenhuma conta será ativada sem sua confirmação.
          </p>
          
          <p class="text center" style="font-size: 14px; color: #a3a3a3; margin-top: 30px;">
            Está com problemas para clicar no botão? Copie e cole o link abaixo no seu navegador:
            <br>
            <span style="color: #00e8d4; word-break: break-all;">
              ${verificationLink}
            </span>
          </p>
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
    Verificação de Conta - Nutreon
    
    Olá, ${customerName}!
    
    Obrigado por se cadastrar na Nutreon! Você está a apenas um clique de acessar nosso ecossistema completo de nutrição e saúde.
    
    Para ativar sua conta e garantir a segurança de suas informações, precisamos confirmar seu endereço de e-mail.
    
    Clique no link abaixo para verificar seu e-mail:
    ${verificationLink}
    
    Por que verificar seu e-mail?
    • Segurança: Protege sua conta contra acessos não autorizados
    • Comunicação: Garante que você receba atualizações importantes sobre seus pedidos
    • Recuperação: Permite recuperar sua senha caso esqueça
    • Benefícios: Habilita acesso a ofertas exclusivas e promoções especiais
    
    ⏰ Este link de verificação expira em 24 horas
    
    Se você não criou uma conta na Nutreon, por favor ignore este e-mail.
    
    Atenciosamente,
    Equipe Nutreon
    Nutrindo Saúde, Transformando Vidas
  `
});