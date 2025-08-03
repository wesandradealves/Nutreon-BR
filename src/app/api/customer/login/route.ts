import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { loginCustomerSchema } from '@/core/infrastructure/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar entrada
    const validatedData = loginCustomerSchema.parse(body);
    
    // Obter informações do contexto
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'IP não disponível';
    const userAgent = request.headers.get('user-agent') || 'Navegador não identificado';
    
    const result = await container.authenticateCustomerUseCase.execute(validatedData, {
      ipAddress,
      userAgent,
    });
    
    // Criar resposta com cookie
    const response = NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });

    // Cookie HTTPOnly para segurança
    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error);
    
    if (error instanceof Error) {
      const statusCode = error.message.includes('inválidos') ? 401 : 400;
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }, { status: statusCode });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Erro ao fazer login',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}