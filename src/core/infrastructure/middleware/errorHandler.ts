import { NextResponse } from 'next/server';

export interface ApiError extends Error {
  statusCode?: number;
}

export function createApiError(message: string, statusCode: number = 400): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
}

export async function handleApiRoute<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    const result = await handler();
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    
    const statusCode = (error as ApiError).statusCode || 500;
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return NextResponse.json({
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    }, { status: statusCode });
  }
}