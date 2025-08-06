export const loginNotificationTemplate = (
  customerName: string,
  ipAddress?: string,
  userAgent?: string
) => {
  const loginTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const deviceInfo = userAgent ? parseUserAgent(userAgent) : null;

  return {
    subject: '🔔 Novo acesso à sua conta Nutreon',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Notificação de Acesso</title>
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
            border-bottom: 2px solid #3b82f6;
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
          .alert-box {
            background-color: #171717;
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
          }
          .info-table {
            width: 100%;
            margin: 0;
          }
          .info-table td {
            padding: 10px 0;
            border-bottom: 1px solid #404040;
            color: #d4d4d4;
          }
          .info-table td:last-child {
            border-bottom: none;
          }
          .info-table td:first-child {
            font-weight: 600;
            width: 140px;
            color: #a3a3a3;
          }
          .button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #ef4444;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          .button:hover {
            background-color: #dc2626;
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
          .security-box ul {
            margin: 0;
            padding-left: 0;
            list-style: none;
          }
          .security-box li {
            color: #a3a3a3;
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
          }
          .security-box li:before {
            content: "🔒";
            position: absolute;
            left: 0;
          }
          .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }
          .warning h3 {
            color: #92400e;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 600;
          }
          .warning p {
            color: #92400e;
            margin: 0;
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
            <h1>Notificação de Acesso</h1>
            <p>Alerta de Segurança</p>
          </div>
          
          <div class="content">
            <h2 class="greeting">Olá, ${customerName}!</h2>
            
            <p class="text">
              Detectamos um novo acesso à sua conta Nutreon. Por sua segurança, 
              estamos notificando sobre esta atividade.
            </p>
            
            <div class="alert-box">
              <table class="info-table">
                <tr>
                  <td>📅 Data/Hora:</td>
                  <td>${loginTime}</td>
                </tr>
                ${ipAddress ? `
                <tr>
                  <td>🌐 Endereço IP:</td>
                  <td>${ipAddress}</td>
                </tr>
                ` : ''}
                ${deviceInfo ? `
                <tr>
                  <td>💻 Dispositivo:</td>
                  <td>${deviceInfo.device}</td>
                </tr>
                <tr>
                  <td>🌏 Navegador:</td>
                  <td>${deviceInfo.browser}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div class="warning">
              <h3>⚠️ Não reconhece este acesso?</h3>
              <p>
                Se você não fez este login, sua conta pode estar comprometida. 
                Recomendamos que altere sua senha imediatamente.
              </p>
            </div>
            
            <div class="center">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/conta" class="button">
                Alterar Senha Agora
              </a>
            </div>
            
            <div class="security-box">
              <h3>Dicas de Segurança</h3>
              <ul>
                <li>Use uma senha forte com letras, números e símbolos</li>
                <li>Nunca compartilhe sua senha com ninguém</li>
                <li>Evite usar a mesma senha em múltiplos sites</li>
                <li>Desconfie de e-mails suspeitos pedindo sua senha</li>
              </ul>
            </div>
            
            <p class="text" style="font-size: 14px; color: #a3a3a3;">
              Se foi você que fez este acesso, pode ignorar este e-mail com segurança. 
              Estamos sempre monitorando sua conta para mantê-la protegida.
            </p>
          </div>
          
          <div class="footer">
            <p>Este é um e-mail automático de segurança enviado para proteger sua conta.</p>
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
      Notificação de Acesso - Nutreon
      
      Olá, ${customerName}!
      
      Detectamos um novo acesso à sua conta:
      
      📅 Data/Hora: ${loginTime}
      ${ipAddress ? `🌐 IP: ${ipAddress}` : ''}
      ${deviceInfo ? `💻 Dispositivo: ${deviceInfo.device}` : ''}
      ${deviceInfo ? `🌏 Navegador: ${deviceInfo.browser}` : ''}
      
      ⚠️ Não reconhece este acesso?
      Se você não fez este login, altere sua senha imediatamente em:
      ${process.env.NEXT_PUBLIC_APP_URL}/conta
      
      Dicas de Segurança:
      • Use uma senha forte com letras, números e símbolos
      • Nunca compartilhe sua senha com ninguém
      • Evite usar a mesma senha em múltiplos sites
      • Desconfie de e-mails suspeitos pedindo sua senha
      
      Se foi você que fez este acesso, pode ignorar este e-mail.
      
      Atenciosamente,
      Equipe de Segurança Nutreon
    `
  };
};

function parseUserAgent(userAgent: string): { device: string; browser: string } | null {
  try {
    // Detecção simplificada de browser
    let browser = 'Desconhecido';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Detecção simplificada de dispositivo
    let device = 'Desktop';
    if (userAgent.includes('Mobile')) device = 'Mobile';
    else if (userAgent.includes('Tablet')) device = 'Tablet';

    return { device, browser };
  } catch {
    return null;
  }
}