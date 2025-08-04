/**
 * Funções de validação
 */

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida CPF brasileiro
 */
export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let result = (sum * 10) % 11;
  if (result === 10) result = 0;
  if (result !== parseInt(cleaned.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  result = (sum * 10) % 11;
  if (result === 10) result = 0;
  if (result !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

/**
 * Valida CEP brasileiro
 */
export const isValidCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
};

/**
 * Valida senha forte
 */
export const isStrongPassword = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) {
    score++;
  } else {
    feedback.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push('Adicione uma letra maiúscula');
  }
  
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push('Adicione uma letra minúscula');
  }
  
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('Adicione um número');
  }
  
  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('Adicione um caractere especial');
  }
  
  return {
    isValid: score >= 4,
    score,
    feedback,
  };
};

/**
 * Valida URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida data de nascimento (maior de idade)
 */
export const isAdult = (birthDate: string | Date): boolean => {
  const date = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};