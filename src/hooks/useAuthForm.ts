'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { usePasswordValidation } from './usePasswordValidation';
import { usePhoneFormat } from './usePhoneFormat';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function useAuthForm(redirectTo: string = '/conta') {
  const router = useRouter();
  const { login, register } = useAuth();
  const { validatePassword, validatePasswordMatch } = usePasswordValidation();
  const { removePhoneMask } = usePhoneFormat();
  
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estados dos formulários
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginData.email, loginData.password);
      setSuccess('Login realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        router.push(redirectTo);
      }, 1000);
    } catch (err) {
      setError((err as Error).message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validar senha
    const passwordValidation = validatePassword(registerData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }
    
    // Validar confirmação de senha
    if (!validatePasswordMatch(registerData.password, registerData.confirmPassword)) {
      setError('As senhas não conferem');
      return;
    }

    setLoading(true);

    try {
      const cleanPhone = removePhoneMask(registerData.phone);
      
      await register({
        name: registerData.name,
        email: registerData.email,
        phone: cleanPhone,
        password: registerData.password,
      });
      
      setSuccess('Cadastro realizado com sucesso! Verifique seu email para ativar sua conta.');
      // Limpar formulário após sucesso
      setRegisterData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError((err as Error).message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const updateLoginData = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateRegisterData = (field: keyof RegisterData, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return {
    tab,
    loading,
    error,
    success,
    loginData,
    registerData,
    handleTabChange,
    handleLogin,
    handleRegister,
    updateLoginData,
    updateRegisterData,
  };
}