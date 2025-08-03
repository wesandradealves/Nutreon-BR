'use client';

import { useState, useCallback, useEffect } from 'react';

interface PasswordStrength {
  score: number;
  feedback: string;
}

export function usePasswordValidation() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: ''
  });

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('A senha deve conter pelo menos um número');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, feedback: '' };
    
    let score = 0;
    let feedback = 'Muito fraca';
    
    // Tem números
    if (/\d/.test(password)) score++;
    
    // Tem letras minúsculas
    if (/[a-z]/.test(password)) score++;
    
    // Tem letras maiúsculas
    if (/[A-Z]/.test(password)) score++;
    
    // Tem caracteres especiais
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    // Tem pelo menos 8 caracteres
    if (password.length >= 8) score++;
    
    if (score <= 1) feedback = 'Muito fraca';
    else if (score <= 2) feedback = 'Fraca';
    else if (score <= 3) feedback = 'Média';
    else if (score <= 4) feedback = 'Forte';
    else feedback = 'Muito forte';
    
    return { score: Math.min(score, 4), feedback };
  };

  const validatePasswords = useCallback(() => {
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setPasswordError(validation.errors[0]);
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return false;
    }
    
    setPasswordError('');
    return true;
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password) {
      const strength = getPasswordStrength(password);
      setPasswordStrength(strength);
      
      const validation = validatePassword(password);
      if (!validation.isValid && password.length > 0) {
        setPasswordError(validation.errors[0]);
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
      setPasswordError('');
    }
  }, [password]);

  return {
    password,
    confirmPassword,
    passwordStrength,
    passwordError,
    setPassword,
    setConfirmPassword,
    validatePasswords,
    validatePassword,
    validatePasswordMatch,
    getPasswordStrength,
  };
}