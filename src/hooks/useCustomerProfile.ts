'use client';

import { useState } from 'react';
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

  const updateProfile = async (data: UpdateProfileData) => {
    const cleanPhone = removePhoneMask(data.phone);
    
    const result = await updateProfileApi.request('/api/customer/update', {
      method: 'PUT',
      data: {
        name: data.name,
        phone: cleanPhone,
      },
    });

    if (result.success && result.data) {
      setMessage(result.data.message || 'Dados atualizados com sucesso!');
      
      if (result.data.customer) {
        updateCustomer({
          name: result.data.customer.name,
          phone: result.data.customer.phone,
        });
      }
      
      return { success: true, data: result.data.customer };
    }

    return { success: false, error: result.error };
  };

  const changePassword = async (data: ChangePasswordData) => {
    const result = await changePasswordApi.request('/api/customer/change-password', {
      method: 'POST',
      data,
    });

    if (result.success && result.data) {
      setMessage(result.data.message || 'Senha alterada com sucesso! Redirecionando para login...');
      
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
      
      return { success: true };
    }

    return { success: false, error: result.error };
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const clearMessage = () => setMessage('');
  const clearError = () => {
    updateProfileApi.clearError();
    changePasswordApi.clearError();
  };

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