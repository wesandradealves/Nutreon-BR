import { tokenManager } from './nuvemshop-token-manager';

interface RequestConfig {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class NuvemshopClient {
  private baseUrl: string;
  private version: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL || 'https://api.tiendanube.com';
    this.version = process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION || 'v1';
  }
  
  async request<T = unknown>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const token = await tokenManager.getToken();
    const userId = await tokenManager.getUserId();
    
    if (!token || !userId) {
      console.error('❌ [NuvemshopClient] Token ou User ID não disponível!');
      throw new Error('Token ou User ID não disponível. Configure as variáveis de ambiente.');
    }
    
    // Construir URL completa
    const url = `${this.baseUrl}/${this.version}/${userId}${endpoint}`;
    
    const response = await fetch(url, {
      method: config.method || 'GET',
      headers: {
        'Authentication': `bearer ${token}`,
        'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-BR',
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    
    // Verificar rate limit - só avisa se estiver baixo
    const remaining = response.headers.get('x-rate-limit-remaining');
    const limit = response.headers.get('x-rate-limit-limit');
    if (remaining && limit) {
      const remainingNum = parseInt(remaining);
      const limitNum = parseInt(limit);
      const percentage = (remainingNum / limitNum) * 100;
      
      if (percentage < 20) {
        console.warn(`⚠️ [NuvemshopClient] RATE LIMIT BAIXO! ${remaining}/${limit} (${percentage.toFixed(0)}%) requisições restantes`);
      }
    }
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ [NuvemshopClient] Erro ${response.status}: ${endpoint}`);
      throw new Error(`Nuvemshop API Error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    
    return data as T;
  }
  
  // Métodos de conveniência
  async get<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }
  
  async post<T = unknown>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data,
    });
  }
  
  async put<T = unknown>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data,
    });
  }
  
  async delete<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const nuvemshopClient = new NuvemshopClient();