import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Cria uma resposta de sucesso padronizada
 */
export function successResponse<T>(
  data: T, 
  extras?: Record<string, unknown>
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...extras,
  });
}

/**
 * Cria uma resposta de erro padronizada
 */
export function errorResponse(
  error: string,
  status: number = 400,
  extras?: Record<string, unknown>
): NextResponse {
  return NextResponse.json({
    success: false,
    error,
    timestamp: new Date().toISOString(),
    ...extras,
  }, { status });
}

/**
 * Determina o código de status HTTP baseado na mensagem de erro
 */
export function getStatusCodeFromError(message: string): number {
  // 404 - Not Found
  if (message.includes('não encontrado') || 
      message.includes('não existe')) {
    return 404;
  }
  
  // 401 - Unauthorized
  if (message.includes('Não autenticado') || 
      message.includes('não autenticado') ||
      message.includes('inválidos') || 
      message.includes('incorreta')) {
    return 401;
  }
  
  // 409 - Conflict
  if (message.includes('já cadastrado') || 
      message.includes('já existe')) {
    return 409;
  }
  
  // 400 - Bad Request (padrão)
  return 400;
}

/**
 * Trata erros de forma padronizada para APIs
 */
export function handleApiError(
  error: unknown, 
  context: string,
  defaultMessage?: string
): NextResponse {
  console.error(`Erro ${context}:`, error);
  
  // Erro de validação Zod
  if (error instanceof z.ZodError) {
    return errorResponse(
      error.issues[0].message,
      400
    );
  }
  
  // Erro genérico
  const message = error instanceof Error 
    ? error.message 
    : (defaultMessage || `Erro ${context}`);
    
  const status = getStatusCodeFromError(message);
  
  return errorResponse(message, status);
}

/**
 * Configuração padrão para cookies seguros
 */
export interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge?: number;
}

/**
 * Retorna configuração padrão para cookies
 */
export function getDefaultCookieConfig(maxAgeDays: number = 7): CookieConfig {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * maxAgeDays,
  };
}

/**
 * Cria uma resposta com cookie
 */
export function responseWithCookie<T>(
  data: T,
  cookieName: string,
  cookieValue: string,
  cookieConfig?: Partial<CookieConfig>
): NextResponse {
  const response = successResponse(data);
  const config = {
    ...getDefaultCookieConfig(),
    ...cookieConfig,
  };
  
  response.cookies.set(cookieName, cookieValue, config);
  return response;
}