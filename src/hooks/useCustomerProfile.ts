'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { usePhoneFormat } from './usePhoneFormat';

interface UpdateProfileData {
  name: string;
  phone: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useCustomerProfile() {
  const router = useRouter();
  const { logout, updateCustomer } = useAuth();
  const { removePhoneMask } = usePhoneFormat();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateProfile = async (data: UpdateProfileData) => {
    setLoading(true);
    setError('');
    
    try {
      const cleanPhone = removePhoneMask(data.phone);
      
      const response = await fetch('/api/customer/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: cleanPhone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao atualizar dados');
      }

      setMessage('Dados atualizados com sucesso!');
      
      // Atualizar contexto de autenticação
      if (result.customer) {
        updateCustomer({
          name: result.customer.name,
          phone: result.customer.phone,
        });
      }
      
      return { success: true, data: result.customer };
    } catch (err) {
      const errorMessage = (err as Error).message || 'Erro ao atualizar dados';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/customer/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao alterar senha');
      }

      setMessage('Senha alterada com sucesso! Redirecionando para login...');
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
      
      return { success: true };
    } catch (err) {
      const errorMessage = (err as Error).message || 'Erro ao alterar senha';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const clearMessage = () => setMessage('');
  const clearError = () => setError('');

  return {
    loading,
    message,
    error,
    updateProfile,
    changePassword,
    handleLogout,
    clearMessage,
    clearError,
  };
}