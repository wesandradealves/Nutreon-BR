/**
 * Padrões regex centralizados para reutilização em toda aplicação
 */

export const REGEX_PATTERNS = {
  // Email
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Telefone
  PHONE: /^\d{10,11}$/,
  PHONE_FORMATTED: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  
  // CEP
  CEP: /^\d{8}$/,
  CEP_FORMATTED: /^\d{5}-\d{3}$/,
  
  // CPF
  CPF: /^\d{11}$/,
  CPF_FORMATTED: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  
  // CNPJ
  CNPJ: /^\d{14}$/,
  CNPJ_FORMATTED: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  
  // Senha
  PASSWORD_MIN_LENGTH: /.{8,}/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_NUMBER: /[0-9]/,
  PASSWORD_SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
  
  // URL
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  
  // Números
  ONLY_NUMBERS: /^\d+$/,
  ONLY_LETTERS: /^[a-zA-Z]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  
  // Nome
  FULL_NAME: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
  
  // Cartão de crédito
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
  EXPIRY_DATE: /^(0[1-9]|1[0-2])\/\d{2}$/,
} as const;

/**
 * Funções auxiliares para validação com regex
 */
export const regexTest = (pattern: RegExp, value: string): boolean => {
  return pattern.test(value);
};

export const regexReplace = (value: string, pattern: RegExp, replacement: string): string => {
  return value.replace(pattern, replacement);
};