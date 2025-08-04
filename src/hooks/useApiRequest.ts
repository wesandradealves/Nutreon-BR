'use client';

import { useState, useCallback } from 'react';
import { apiClient } from '@/services/api-client';
import { AxiosRequestConfig } from 'axios';

interface ApiRequestOptions extends AxiosRequestConfig {
  throwOnError?: boolean;
  isExternal?: boolean;
}

interface ApiRequestResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface AxiosError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
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

    const { throwOnError = false, ...requestOptions } = options;

    try {
      const data = await apiClient.request<T>(url, requestOptions);
      return { success: true, data };
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Erro inesperado';
      setError(errorMessage);

      if (throwOnError) {
        throw new Error(errorMessage);
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