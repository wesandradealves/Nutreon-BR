/**
 * Funções de validação
 */

import { REGEX_PATTERNS } from './regex';

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
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
  return REGEX_PATTERNS.CEP.test(cleaned);
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
  
  if (REGEX_PATTERNS.PASSWORD_MIN_LENGTH.test(password)) {
    score++;
  } else {
    feedback.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (REGEX_PATTERNS.PASSWORD_UPPERCASE.test(password)) {
    score++;
  } else {
    feedback.push('Adicione uma letra maiúscula');
  }
  
  if (REGEX_PATTERNS.PASSWORD_LOWERCASE.test(password)) {
    score++;
  } else {
    feedback.push('Adicione uma letra minúscula');
  }
  
  if (REGEX_PATTERNS.PASSWORD_NUMBER.test(password)) {
    score++;
  } else {
    feedback.push('Adicione um número');
  }
  
  if (REGEX_PATTERNS.PASSWORD_SPECIAL.test(password)) {
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