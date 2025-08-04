/**
 * Funções auxiliares gerais
 */

/**
 * Aguarda um tempo especificado (útil para debounce)
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Gera um ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Verifica se está no ambiente de desenvolvimento
 */
export const isDevelopment = () => process.env.NODE_ENV === 'development';

/**
 * Verifica se está no ambiente de produção
 */
export const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * Verifica se está rodando no lado do cliente
 */
export const isClient = () => typeof window !== 'undefined';

/**
 * Verifica se está rodando no lado do servidor
 */
export const isServer = () => typeof window === 'undefined';

/**
 * Remove acentos de uma string
 */
export const removeAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Converte string para slug URL
 */
export const slugify = (text: string): string => {
  return removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Trunca texto com reticências
 */
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
};

/**
 * Calcula desconto percentual
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Verifica se um objeto está vazio
 */
export const isEmpty = (obj: unknown): boolean => {
  if (!obj) return true;
  if (typeof obj !== 'object') return true;
  return Object.keys(obj as object).length === 0;
};

/**
 * Deep clone de objetos
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function
 */
type AnyFunction = (...args: unknown[]) => unknown;

export const debounce = <T extends AnyFunction>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};