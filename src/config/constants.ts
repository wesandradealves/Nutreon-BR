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
  // Autenticação
  UNAUTHORIZED: 'Não autenticado',
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  USER_NOT_FOUND: 'Cliente não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  EMAIL_ALREADY_IN_USE: 'Cliente já cadastrado com este email',
  INCORRECT_PASSWORD: 'Senha incorreta',
  NO_PASSWORD_SET: 'Cliente sem senha cadastrada',
  INVALID_TOKEN: 'Token inválido ou expirado',
  SESSION_EXPIRED: 'Sessão expirada',
  
  // Validação
  INVALID_EMAIL: 'Email inválido',
  INVALID_PHONE: 'Telefone inválido',
  INVALID_CEP: 'CEP inválido',
  INVALID_CPF: 'CPF inválido',
  WEAK_PASSWORD: 'Senha muito fraca',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  REQUIRED_FIELD: 'Campo obrigatório',
  
  // Verificação de email
  EMAIL_NOT_VERIFIED: 'Email não verificado',
  VERIFICATION_EMAIL_SENT: 'Email de verificação enviado',
  EMAIL_ALREADY_VERIFIED: 'Email já verificado',
  
  // Recuperação de senha
  PASSWORD_RESET_SENT: 'Email de recuperação enviado',
  INVALID_RESET_TOKEN: 'Token de recuperação inválido',
  
  // Produtos
  PRODUCT_NOT_FOUND: 'Produto não encontrado',
  OUT_OF_STOCK: 'Produto sem estoque',
  INSUFFICIENT_STOCK: 'Estoque insuficiente',
  
  // Carrinho
  EMPTY_CART: 'Carrinho vazio',
  ITEM_NOT_IN_CART: 'Item não encontrado no carrinho',
  
  // Pedidos
  ORDER_NOT_FOUND: 'Pedido não encontrado',
  INVALID_ORDER_STATUS: 'Status de pedido inválido',
  
  // Cupons
  COUPON_NOT_FOUND: 'Cupom não encontrado',
  COUPON_EXPIRED: 'Cupom expirado',
  COUPON_INVALID: 'Cupom inválido',
  COUPON_MIN_VALUE: 'Valor mínimo não atingido',
  
  // Genérico
  GENERIC_ERROR: 'Erro ao processar solicitação',
  NETWORK_ERROR: 'Erro de conexão com o servidor',
  TIMEOUT_ERROR: 'Tempo de resposta excedido',
  VALIDATION_ERROR: 'Erro de validação',
  NOT_FOUND: 'Recurso não encontrado',
  FORBIDDEN: 'Acesso negado',
  INTERNAL_ERROR: 'Erro interno do servidor',
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