export function passwordResetEmailTemplate(customerName: string, resetLink: string) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperar Senha - Nutreon</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2ECC71; padding: 40px 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: bold;">Nutreon</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Recuperação de Senha</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Olá ${customerName}!</h2>
              
              <p style="color: #666666; margin: 0 0 20px 0; font-size: 16px; line-height: 24px;">
                Recebemos uma solicitação para redefinir a senha da sua conta. Se você não fez essa solicitação, pode ignorar este email com segurança.
              </p>
              
              <p style="color: #666666; margin: 0 0 30px 0; font-size: 16px; line-height: 24px;">
                Para criar uma nova senha, clique no botão abaixo:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resetLink}" style="display: inline-block; background-color: #2ECC71; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Redefinir Senha
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #999999; margin: 30px 0 20px 0; font-size: 14px; line-height: 20px;">
                Ou copie e cole o link abaixo no seu navegador:
              </p>
              
              <p style="color: #3498db; margin: 0 0 30px 0; font-size: 14px; word-break: break-all;">
                ${resetLink}
              </p>
              
              <p style="color: #999999; margin: 0 0 20px 0; font-size: 14px; line-height: 20px;">
                <strong>Por segurança, este link expira em 1 hora.</strong>
              </p>
              
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
              
              <p style="color: #999999; margin: 0; font-size: 12px; line-height: 18px;">
                Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá a mesma.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="color: #999999; margin: 0 0 10px 0; font-size: 14px;">
                &copy; 2024 Nutreon. Todos os direitos reservados.
              </p>
              <p style="color: #999999; margin: 0; font-size: 12px;">
                Nutrindo Saúde, Transformando Vidas
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Olá ${customerName}!

Recebemos uma solicitação para redefinir a senha da sua conta. Se você não fez essa solicitação, pode ignorar este email com segurança.

Para criar uma nova senha, acesse o link abaixo:
${resetLink}

Por segurança, este link expira em 1 hora.

Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá a mesma.

--
Nutreon
Nutrindo Saúde, Transformando Vidas`;

  return {
    subject: 'Recuperação de Senha - Nutreon',
    html,
    text
  };
}