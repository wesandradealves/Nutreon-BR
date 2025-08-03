import React, { createContext, useContext, useEffect, useState } from 'react';

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

  // Verificar se há dados salvos localmente (sem fazer chamada à API)
  useEffect(() => {
    checkLocalAuth();
  }, []);

  const checkLocalAuth = () => {
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
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/customer/me');
      const data = await response.json();
      
      if (response.ok && data.authenticated) {
        setCustomer(data.customer);
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('customer_data', JSON.stringify(data.customer));
        }
      } else {
        // Se não autenticado, limpar dados locais
        if (typeof window !== 'undefined') {
          localStorage.removeItem('customer_data');
        }
        setCustomer(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Em caso de erro, manter estado atual
    }
  };

  const login = async (email: string, password: string) => {
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
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/customer/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer_data');
      localStorage.removeItem('cart'); // Limpar carrinho também
    }
    setCustomer(null);
    setIsAuthenticated(false);
  };

  const register = async (data: { name: string; email: string; phone?: string; password?: string }) => {
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
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomer = (data: Partial<Customer>) => {
    if (customer) {
      const updatedCustomer = { ...customer, ...data };
      setCustomer(updatedCustomer);
      if (typeof window !== 'undefined') {
        localStorage.setItem('customer_data', JSON.stringify(updatedCustomer));
      }
    }
  };

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