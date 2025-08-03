import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { container } from '@/core/infrastructure/container'

const resendVerificationSchema = z.object({
  email: z.string().email('Email inválido')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validationResult = resendVerificationSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email inválido' 
        },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    const resendVerificationUseCase = container.resendVerificationEmailUseCase
    
    const result = await resendVerificationUseCase.execute({ email })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao reenviar email de verificação:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao processar solicitação' 
      },
      { status: 500 }
    )
  }
}