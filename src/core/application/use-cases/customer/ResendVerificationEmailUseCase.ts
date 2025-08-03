import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository'
import { IEmailVerificationRepository } from '@/core/domain/repositories/IEmailVerificationRepository'
import { IEmailService } from '@/core/domain/services/IEmailService'
import { Email } from '@/core/domain/value-objects/Email'
import { randomBytes } from 'crypto'

interface ResendVerificationEmailRequest {
  email: string
}

interface ResendVerificationEmailResponse {
  success: boolean
  message: string
}

export class ResendVerificationEmailUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly emailVerificationRepository: IEmailVerificationRepository,
    private readonly emailService: IEmailService
  ) {}

  async execute({
    email
  }: ResendVerificationEmailRequest): Promise<ResendVerificationEmailResponse> {
    // Sempre retorna sucesso para não revelar se o email existe
    const successResponse = {
      success: true,
      message: 'Se o email estiver cadastrado, um novo link de verificação será enviado.'
    }

    try {
      // Criar value object Email
      const emailVO = Email.create(email)
      
      // Buscar customer pelo email
      const customer = await this.customerRepository.findByEmail(emailVO)
      
      // Se não existe ou já está verificado, retorna sucesso sem fazer nada
      if (!customer || customer.verified) {
        return successResponse
      }

      // Deletar tokens antigos
      const existingTokens = await this.emailVerificationRepository.findByCustomerId(customer.id)
      for (const token of existingTokens) {
        if (!token.verifiedAt) {
          await this.emailVerificationRepository.delete(token.id)
        }
      }

      // Gerar novo token
      const verificationToken = randomBytes(32).toString('hex')
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // 24 horas de validade

      // Salvar novo token
      await this.emailVerificationRepository.create(
        customer.id,
        verificationToken,
        expiresAt
      )

      // Enviar email
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken}`
      
      await this.emailService.sendWelcomeEmail(
        email,
        customer.name,
        verificationUrl
      )

      return successResponse
    } catch (error) {
      console.error('Erro ao reenviar email de verificação:', error)
      // Mesmo em caso de erro, retorna sucesso para segurança
      return successResponse
    }
  }
}