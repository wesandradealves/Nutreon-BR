export function passwordResetEmailTemplate(customerName: string, resetLink: string) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperar Senha - Nutreon</title>
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
    .security-box {
      background-color: #171717;
      border: 1px solid #404040;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .security-box h3 {
      color: #00e8d4;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 18px;
    }
    .security-box p {
      color: #a3a3a3;
      margin: 10px 0;
      font-size: 14px;
    }
    .link-box {
      background-color: #171717;
      border: 1px solid #404040;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      word-break: break-all;
    }
    .link-box p {
      margin: 0;
      color: #00e8d4;
      font-size: 14px;
    }
    .warning {
      color: #f59e0b;
      font-weight: 600;
      margin: 20px 0;
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
        <img src="${process.env.NEXT_PUBLIC_APP_URL}/img/logo.png" alt="Nutreon" />
      </div>
      <h1>Recuperação de Senha</h1>
      <p>Nutrindo Saúde, Transformando Vidas</p>
    </div>
    
    <div class="content">
      <h2 class="greeting">Olá, ${customerName}!</h2>
      
      <p class="text">
        Recebemos uma solicitação para redefinir a senha da sua conta Nutreon. 
        Se você não fez essa solicitação, pode ignorar este e-mail com segurança.
      </p>
      
      <p class="text">
        Para criar uma nova senha, clique no botão abaixo:
      </p>
      
      <div class="center">
        <a href="${resetLink}" class="button">
          Redefinir Minha Senha
        </a>
      </div>
      
      <p class="text" style="color: #a3a3a3; font-size: 14px; margin-top: 20px;">
        Ou copie e cole o link abaixo no seu navegador:
      </p>
      
      <div class="link-box">
        <p>${resetLink}</p>
      </div>
      
      <p class="warning">
        ⚠️ Por segurança, este link expira em 1 hora.
      </p>
      
      <div class="security-box">
        <h3>Dicas de Segurança</h3>
        <p>• Nunca compartilhe este link com ninguém</p>
        <p>• Crie uma senha forte com letras, números e símbolos</p>
        <p>• Use uma senha diferente para cada conta online</p>
        <p>• Se você não solicitou esta alteração, entre em contato conosco imediatamente</p>
      </div>
      
      <p class="text" style="font-size: 14px; color: #a3a3a3;">
        Se você não solicitou a redefinição de senha, ignore este e-mail. 
        Sua senha permanecerá a mesma e ninguém mais poderá alterá-la sem este link.
      </p>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="https://www.facebook.com/nutreon">Facebook</a>
        <a href="https://www.instagram.com/nutreon">Instagram</a>
        <a href="https://www.youtube.com/nutreon">YouTube</a>
      </div>
      <p>Este email foi enviado para ${customerName} porque foi solicitada a recuperação de senha.</p>
      <p>© ${new Date().getFullYear()} Nutreon. Todos os direitos reservados.</p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/politica-de-privacidade">Política de Privacidade</a> | 
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/termos-de-uso">Termos de Uso</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `Olá ${customerName}!

Recebemos uma solicitação para redefinir a senha da sua conta Nutreon. Se você não fez essa solicitação, pode ignorar este email com segurança.

Para criar uma nova senha, acesse o link abaixo:
${resetLink}

⚠️ Por segurança, este link expira em 1 hora.

Dicas de Segurança:
• Nunca compartilhe este link com ninguém
• Crie uma senha forte com letras, números e símbolos
• Use uma senha diferente para cada conta online
• Se você não solicitou esta alteração, entre em contato conosco imediatamente

Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá a mesma.

--
Nutreon
Nutrindo Saúde, Transformando Vidas`;

  return {
    subject: '🔐 Recuperação de Senha - Nutreon',
    html,
    text
  };
}