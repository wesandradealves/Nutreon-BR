import { NextResponse } from 'next/server';
import { successResponse, errorResponse } from './api-utils';
import { LOG_EMOJIS } from '@/config/constants';

/**
 * Trata erros específicos da API Nuvemshop
 */
export function handleNuvemshopError(error: unknown, resource: string): NextResponse {
  console.error(`${LOG_EMOJIS.ERROR} [BFF] Erro ao buscar ${resource}:`, error);
  
  const message = error instanceof Error ? error.message : 'Erro desconhecido';
  return errorResponse(message, 500);
}

/**
 * Cria resposta de sucesso com metadados para APIs Nuvemshop
 */
export function nuvemshopSuccessResponse<T>(
  data: T,
  meta?: Record<string, unknown>
): NextResponse {
  return successResponse(data, meta ? { meta } : undefined);
}