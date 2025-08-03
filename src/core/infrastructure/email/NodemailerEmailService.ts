import { IEmailService, EmailData } from '@/core/domain/services/IEmailService';
import { welcomeEmailTemplate } from './templates/welcome';
import { loginNotificationTemplate } from './templates/login-notification';
import { passwordResetEmailTemplate } from './templates/password-reset';
import type { Transporter } from 'nodemailer';

export class NodemailerEmailService implements IEmailService {
  private transporter: Transporter | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    try {
      // Importação dinâmica para evitar problemas com Next.js
      const nodemailer = await import('nodemailer');
      
      // Configuração do transporter
      if (process.env.NODE_ENV === 'production') {
        // Configuração para produção (exemplo com Gmail)
        this.transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      } else {
        // Para desenvolvimento, usar Ethereal Email (fake SMTP)
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER || 'ethereal.user',
            pass: process.env.EMAIL_PASS || 'ethereal.pass',
          },
        });
      }
      
      this.isInitialized = true;
      console.log('✅ Serviço de email inicializado');
    } catch (error) {
      console.error('❌ Erro ao inicializar serviço de email:', error);
      this.isInitialized = false;
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized) {
      await this.initializeTransporter();
    }
  }

  async sendEmail(data: EmailData): Promise<void> {
    try {
      await this.ensureInitialized();
      
      if (!this.transporter) {
        console.error('❌ Transporter de email não inicializado');
        return;
      }

      const info = await this.transporter.sendMail({
        from: `"Nutreon" <${process.env.EMAIL_FROM || 'noreply@nutreon.com'}>`,
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
      });

      if (process.env.NODE_ENV === 'development') {
        const nodemailer = await import('nodemailer');
        console.log('📧 Email enviado:', nodemailer.getTestMessageUrl(info));
      }
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      // Em produção, você poderia enviar para um sistema de monitoramento
      // Por ora, vamos apenas logar o erro sem quebrar o fluxo
    }
  }

  async sendWelcomeEmail(to: string, customerName: string, verificationLink?: string): Promise<void> {
    const template = welcomeEmailTemplate(customerName, verificationLink);
    await this.sendEmail({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  async sendLoginNotificationEmail(
    to: string,
    customerName: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const template = loginNotificationTemplate(customerName, ipAddress, userAgent);
    await this.sendEmail({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  async sendPasswordResetEmail(
    to: string,
    customerName: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    const template = passwordResetEmailTemplate(customerName, resetUrl);
    
    await this.sendEmail({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}