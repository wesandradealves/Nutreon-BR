/**
 * Constantes de tempo em segundos
 */
export const TIME = {
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
} as const;

/**
 * Configurações de cookies
 */
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth-token',
  NUVEMSHOP_TOKEN: 'nuvemshop_token',
  NUVEMSHOP_USER_ID: 'nuvemshop_user_id',
} as const;

/**
 * Configurações de expiração
 */
export const EXPIRATION = {
  AUTH_TOKEN_DAYS: 7,
  NUVEMSHOP_TOKEN_DAYS: 30,
} as const;

/**
 * URLs externas
 */
export const EXTERNAL_URLS = {
  NUVEMSHOP_TOKEN: 'https://www.tiendanube.com/apps/authorize/token',
  NUVEMSHOP_AUTH: 'https://www.tiendanube.com/apps/authorize/authorize',
} as const;

/**
 * Configurações da aplicação
 */
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Nutreon',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  CURRENCY: process.env.NEXT_PUBLIC_CURRENCY || 'BRL',
  LOCALE: process.env.NEXT_PUBLIC_LOCALE || 'pt-BR',
} as const;

/**
 * Configurações Nuvemshop
 */
export const NUVEMSHOP_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_SECRET,
  REDIRECT_URI: process.env.NEXT_PUBLIC_NUVEMSHOP_REDIRECT_URI,
  API_URL: process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL || 'https://api.tiendanube.com',
  API_VERSION: process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION || 'v1',
  USER_ID: process.env.NEXT_PUBLIC_NUVEMSHOP_USER_ID,
  STORE_ID: process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID,
} as const;

/**
 * Configurações de autenticação
 */
export const AUTH_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10'),
} as const;

/**
 * Mensagens de erro padrão
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Não autenticado',
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  USER_NOT_FOUND: 'Cliente não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  INCORRECT_PASSWORD: 'Senha incorreta',
  GENERIC_ERROR: 'Erro ao processar solicitação',
} as const;

/**
 * Emojis para logs (BFF)
 */
export const LOG_EMOJIS = {
  REQUEST: '🎯',
  SUCCESS: '✅',
  ERROR: '❌',
  INFO: '🔍',
  WARNING: '⚠️',
  SEARCH: '🔎',
  LOADING: '🚀',
  AUTH: '🔐',
  EMAIL: '📧',
  STORE: '🏪',
  PRODUCT: '📦',
  CATEGORY: '📂',
  HEALTH: '🏥',
  DEBUG: '🐛',
  TEST: '🧪',
} as const;