'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { usePhoneFormat } from './usePhoneFormat';
import { useApiRequest } from './useApiRequest';

interface UpdateProfileData {
  name: string;
  phone: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateProfileResponse {
  message: string;
  customer: {
    name: string;
    phone: string;
  };
}

interface ChangePasswordResponse {
  message: string;
}

export function useCustomerProfile() {
  const router = useRouter();
  const { logout, updateCustomer } = useAuth();
  const { removePhoneMask } = usePhoneFormat();
  const updateProfileApi = useApiRequest<UpdateProfileResponse>();
  const changePasswordApi = useApiRequest<ChangePasswordResponse>();
  
  const [message, setMessage] = useState('');

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    const cleanPhone = removePhoneMask(data.phone);
    
    const result = await updateProfileApi.request('/api/customer/update', {
      method: 'PUT',
      data: {
        name: data.name,
        phone: cleanPhone,
      },
    });

    if (result.success && result.data) {
      const message = result.data.message || 'Dados atualizados com sucesso!';
      setMessage(message);
      
      if (result.data.customer) {
        updateCustomer({
          name: result.data.customer.name,
          phone: result.data.customer.phone,
        });
      }
      
      return { success: true, data: result.data.customer };
    }

    return { success: false, error: result.error };
  }, [removePhoneMask, updateProfileApi, updateCustomer]);

  const changePassword = useCallback(async (data: ChangePasswordData) => {
    const result = await changePasswordApi.request('/api/customer/change-password', {
      method: 'POST',
      data,
    });

    if (result.success && result.data) {
      const message = result.data.message || 'Senha alterada com sucesso! Faça login novamente.';
      setMessage(message);
      
      // A API já remove o cookie, então só precisamos redirecionar
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
      return { success: true };
    }

    return { success: false, error: result.error };
  }, [changePasswordApi, router]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/');
  }, [logout, router]);

  const clearMessage = useCallback(() => setMessage(''), []);
  const clearError = useCallback(() => {
    updateProfileApi.clearError();
    changePasswordApi.clearError();
  }, [updateProfileApi, changePasswordApi]);

  const loading = updateProfileApi.loading || changePasswordApi.loading;
  const error = updateProfileApi.error || changePasswordApi.error;

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