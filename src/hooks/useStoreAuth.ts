'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export function useStoreAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    storeData: null,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.authenticated) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          storeData: data.store,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          storeData: null,
        });
      }
    } catch {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        storeData: null,
      });
    }
  };

  const logout = async () => {
    // Limpar cookies via API route
    await fetch('/api/auth/logout', { method: 'POST' });
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