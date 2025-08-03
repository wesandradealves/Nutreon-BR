import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { LogoutCustomerUseCase } from '@/core/application/use-cases/customer/LogoutCustomerUseCase';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Tentar obter token do cookie primeiro
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get('auth-token')?.value;
    
    // Se não tem no cookie, tentar do header Authorization
    const authHeader = request.headers.get('Authorization');
    const tokenFromHeader = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    const token = tokenFromCookie || tokenFromHeader;
    
    if (token) {
      try {
        const useCase = container.resolve('logoutCustomerUseCase') as LogoutCustomerUseCase;
        await useCase.execute(token);
      } catch (error) {
        // Log do erro mas não falha o logout
        console.error('Erro ao desativar sessão:', error);
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });

    // Remover cookie de autenticação
    response.cookies.delete('auth-token');

    return response;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao fazer logout' 
      },
      { status: 500 }
    );
  }
}