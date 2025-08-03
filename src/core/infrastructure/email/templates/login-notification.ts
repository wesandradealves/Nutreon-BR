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
    subject: 'Novo acesso à sua conta Nutreon',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Notificação de Acesso</title>
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
            background-color: #3b82f6;
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .alert-box {
            background-color: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
          }
          .info-table {
            width: 100%;
            margin: 20px 0;
          }
          .info-table td {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .info-table td:first-child {
            font-weight: bold;
            width: 120px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #ef4444;
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Notificação de Acesso</h1>
          </div>
          
          <div class="content">
            <h2>Olá, ${customerName}!</h2>
            
            <p>Detectamos um novo acesso à sua conta Nutreon:</p>
            
            <div class="alert-box">
              <table class="info-table">
                <tr>
                  <td>Data/Hora:</td>
                  <td>${loginTime}</td>
                </tr>
                ${ipAddress ? `
                <tr>
                  <td>IP:</td>
                  <td>${ipAddress}</td>
                </tr>
                ` : ''}
                ${deviceInfo ? `
                <tr>
                  <td>Dispositivo:</td>
                  <td>${deviceInfo.device}</td>
                </tr>
                <tr>
                  <td>Navegador:</td>
                  <td>${deviceInfo.browser}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <p><strong>Foi você?</strong></p>
            <p>Se você reconhece este acesso, pode ignorar este email com segurança.</p>
            
            <p><strong>Não foi você?</strong></p>
            <p>Se você não reconhece este acesso, recomendamos que altere sua senha imediatamente:</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/conta/seguranca" class="button">
                Alterar Senha Agora
              </a>
            </div>
            
            <p>Dicas de segurança:</p>
            <ul>
              <li>Use uma senha forte e única</li>
              <li>Não compartilhe sua senha com ninguém</li>
              <li>Ative a autenticação de dois fatores quando disponível</li>
            </ul>
            
            <p>Atenciosamente,<br>
            <strong>Equipe de Segurança Nutreon</strong></p>
          </div>
          
          <div class="footer">
            <p>Este é um email automático de segurança enviado para proteger sua conta.</p>
            <p>© ${new Date().getFullYear()} Nutreon. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Notificação de Acesso - Nutreon
      
      Olá, ${customerName}!
      
      Detectamos um novo acesso à sua conta:
      
      Data/Hora: ${loginTime}
      ${ipAddress ? `IP: ${ipAddress}` : ''}
      ${deviceInfo ? `Dispositivo: ${deviceInfo.device}` : ''}
      ${deviceInfo ? `Navegador: ${deviceInfo.browser}` : ''}
      
      Se você não reconhece este acesso, altere sua senha imediatamente em:
      ${process.env.NEXT_PUBLIC_APP_URL}/conta/seguranca
      
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