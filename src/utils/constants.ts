/**
 * Constantes do sistema
 */

// Configurações de frete
export const SHIPPING = {
  FREE_THRESHOLD: 200, // Frete grátis acima de R$ 200
  RATES: {
    DEFAULT: 20,
    DISCOUNTED: 15,
    DISCOUNTED_MIN: 52,
    DISCOUNTED_MAX: 166.59,
  },
} as const;

// Estados brasileiros
export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const;

// Configurações de paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48, 96],
} as const;

// Imagens padrão
export const IMAGES = {
  PRODUCT_PLACEHOLDER: 'https://cdn.oceanserver.com.br/lojas/gymchef/uploads_produto/56-kibe-recheado-pure-de-cenoura-230g-683cbdf74d6a8.webp',
  AUTH_BACKGROUND: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
} as const;

// Cookies
export const COOKIES = {
  CART_SESSION: 'nutreon_cart_session',
  AUTH_TOKEN: 'auth-token',
} as const;