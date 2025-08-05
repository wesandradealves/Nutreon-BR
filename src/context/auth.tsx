import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  verified?: boolean;
  addresses?: Array<{
    id: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

interface AuthContextProps {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: { name: string; email: string; phone?: string; password?: string }) => Promise<void>;
  updateCustomer: (data: Partial<Customer>) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkLocalAuth = useCallback(() => {
    // Verificar se estamos no cliente antes de acessar localStorage
    if (typeof window === 'undefined') return;
    
    // Apenas verificar dados locais, sem fazer chamada à API
    const savedCustomer = localStorage.getItem('customer_data');
    if (savedCustomer) {
      try {
        const customerData = JSON.parse(savedCustomer);
        setCustomer(customerData);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('customer_data');
      }
    }
  }, []);

  // Verificar se há dados salvos localmente (sem fazer chamada à API)
  useEffect(() => {
    checkLocalAuth();
  }, [checkLocalAuth]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/customer/me');
      const data = await response.json();
      
      if (response.ok && data.success && data.data?.authenticated) {
        setCustomer(data.data.customer);
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('customer_data', JSON.stringify(data.data.customer));
        }
      } else {
        // Se não autenticado, limpar dados locais
        if (typeof window !== 'undefined') {
          localStorage.removeItem('customer_data');
        }
        setCustomer(null);
        setIsAuthenticated(false);
      }
    } catch {
      // Em caso de erro, manter estado atual
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      setCustomer(data.data.customer);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('customer_data', JSON.stringify(data.data.customer));
      }
      
      toast.success(`Bem-vindo de volta, ${data.data.customer.name}!`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer_data');
      localStorage.removeItem('cart'); // Limpar carrinho também
    }
    setCustomer(null);
    setIsAuthenticated(false);
  }, []);

  const register = useCallback(async (data: { name: string; email: string; phone?: string; password?: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar conta');
      }

      // Não fazer login automático - aguardar verificação de email
      toast.success('Conta criada com sucesso! Verifique seu email para ativar sua conta.');
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCustomer = useCallback((data: Partial<Customer>) => {
    if (customer) {
      const updatedCustomer = { ...customer, ...data };
      setCustomer(updatedCustomer);
      if (typeof window !== 'undefined') {
        localStorage.setItem('customer_data', JSON.stringify(updatedCustomer));
      }
    }
  }, [customer]);

  return (
    <AuthContext.Provider value={{ 
      customer, 
      isAuthenticated, 
      isLoading,
      login, 
      logout,
      register,
      updateCustomer,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};