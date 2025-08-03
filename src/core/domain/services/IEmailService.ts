export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface IEmailService {
  sendWelcomeEmail(to: string, customerName: string): Promise<void>;
  sendLoginNotificationEmail(to: string, customerName: string, ipAddress?: string, userAgent?: string): Promise<void>;
  sendPasswordResetEmail(to: string, customerName: string, resetToken: string): Promise<void>;
  sendEmail(data: EmailData): Promise<void>;
}