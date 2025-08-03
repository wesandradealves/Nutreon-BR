'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApiRequest } from './useApiRequest';

interface StoreData {
  id: number;
  name: { [key: string]: string };
  email: string;
  original_domain: string;
  plan_name: string;
  [key: string]: unknown;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  storeData: StoreData | null;
}

interface AuthResponse {
  authenticated: boolean;
  store?: StoreData;
}

export function useStoreAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    storeData: null,
  });
  const router = useRouter();
  const { request } = useApiRequest<AuthResponse>();

  const checkAuth = useCallback(async () => {
    const response = await request('/api/auth/me');
    
    if (response.success && response.data) {
      if (response.data.authenticated) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          storeData: response.data.store || null,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          storeData: null,
        });
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        storeData: null,
      });
    }
  }, [request]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    // Limpar cookies via API route
    await request('/api/auth/logout', { method: 'POST' });
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      storeData: null,
    });
    router.push('/');
  };

  return {
    ...authState,
    checkAuth,
    logout,
  };
}