'use client';

import { useState, useCallback } from 'react';

interface ApiRequestOptions extends RequestInit {
  throwOnError?: boolean;
}

interface ApiRequestResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function useApiRequest<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const request = useCallback(async (
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiRequestResult<T>> => {
    setLoading(true);
    setError('');

    const { throwOnError = false, ...fetchOptions } = options;

    try {
      // Configurações padrão
      const defaultHeaders = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };

      const response = await fetch(url, {
        ...fetchOptions,
        headers: defaultHeaders,
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || result.message || 'Erro na requisição';
        
        if (throwOnError) {
          throw new Error(errorMessage);
        }

        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);

      if (throwOnError) {
        throw err;
      }

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return {
    loading,
    error,
    request,
    clearError,
  };
}