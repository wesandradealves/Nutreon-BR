'use client';

import { useState, useCallback } from 'react';

interface BFFResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
  timestamp: string;
}

interface UseBFFOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

export function useBFF(options?: UseBFFOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T = unknown>(
    endpoint: string,
    config?: RequestInit
  ): Promise<BFFResponse<T> | null> => {
    setLoading(true);
    setError(null);
    
    console.log(`🌐 [Frontend] Chamando BFF: ${endpoint}`);
    
    try {
      const response = await fetch(`/api${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        ...config,
      });
      
      const data: BFFResponse<T> = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error || `Erro HTTP ${response.status}`;
        console.error(`❌ [Frontend] Erro HTTP no BFF:`, errorMsg);
        setError(errorMsg);
        options?.onError?.(errorMsg);
        return null;
      }
      
      if (!data.success) {
        const errorMsg = data.error || 'Erro desconhecido';
        console.error(`❌ [Frontend] Erro lógico no BFF:`, errorMsg);
        setError(errorMsg);
        options?.onError?.(errorMsg);
        return null;
      }
      
      console.log(`✅ [Frontend] Resposta do BFF:`, data);
      options?.onSuccess?.(data.data);
      return data;
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error(`💥 [Frontend] Erro de rede:`, errorMsg);
      setError(errorMsg);
      options?.onError?.(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    request,
    loading,
    error,
  };
}