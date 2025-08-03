'use client';

export function usePasswordValidation() {
  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 6) {
      errors.push('A senha deve ter pelo menos 6 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak';
    
    let strength = 0;
    
    // Tem números
    if (/\d/.test(password)) strength++;
    
    // Tem letras minúsculas
    if (/[a-z]/.test(password)) strength++;
    
    // Tem letras maiúsculas
    if (/[A-Z]/.test(password)) strength++;
    
    // Tem caracteres especiais
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Tem pelo menos 8 caracteres
    if (password.length >= 8) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  };

  return {
    validatePassword,
    validatePasswordMatch,
    getPasswordStrength,
  };
}