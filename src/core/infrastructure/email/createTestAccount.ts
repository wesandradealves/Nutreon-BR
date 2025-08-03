import nodemailer from 'nodemailer';

// Script para criar conta de teste no Ethereal Email
async function createTestAccount() {
  try {
    // Gerar conta de teste
    const testAccount = await nodemailer.createTestAccount();

    console.log('🎉 Conta de teste criada com sucesso!\n');
    console.log('Adicione estas variáveis ao seu .env.local:\n');
    console.log(`EMAIL_USER=${testAccount.user}`);
    console.log(`EMAIL_PASS=${testAccount.pass}\n`);
    console.log('Para ver os emails enviados, acesse:');
    console.log('https://ethereal.email/login');
    console.log(`Email: ${testAccount.user}`);
    console.log(`Senha: ${testAccount.pass}`);
  } catch (error) {
    console.error('Erro ao criar conta de teste:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createTestAccount();
}