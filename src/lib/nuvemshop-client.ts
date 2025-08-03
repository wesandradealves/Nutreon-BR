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
    console.log(`\n🚀 [NuvemshopClient] Nova requisição para: ${endpoint}`);
    console.log(`📋 [NuvemshopClient] Método: ${config.method || 'GET'}`);
    
    const token = await tokenManager.getToken();
    const userId = await tokenManager.getUserId();
    
    if (!token || !userId) {
      console.error('❌ [NuvemshopClient] Token ou User ID não disponível!');
      throw new Error('Token ou User ID não disponível. Configure as variáveis de ambiente.');
    }
    
    console.log('✅ [NuvemshopClient] Credenciais obtidas com sucesso');
    
    // Construir URL completa
    const url = `${this.baseUrl}/${this.version}/${userId}${endpoint}`;
    console.log(`🔗 [NuvemshopClient] URL completa: ${url}`);
    
    console.log('📡 [NuvemshopClient] Enviando requisição...');
    const startTime = Date.now();
    
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
    
    const endTime = Date.now();
    console.log(`⏱️ [NuvemshopClient] Tempo de resposta: ${endTime - startTime}ms`);
    
    // Verificar rate limit
    const remaining = response.headers.get('x-rate-limit-remaining');
    const limit = response.headers.get('x-rate-limit-limit');
    if (remaining && limit) {
      const remainingNum = parseInt(remaining);
      const limitNum = parseInt(limit);
      const percentage = (remainingNum / limitNum) * 100;
      
      if (percentage < 20) {
        console.warn(`⚠️ [NuvemshopClient] RATE LIMIT BAIXO! ${remaining}/${limit} (${percentage.toFixed(0)}%) requisições restantes`);
      } else {
        console.log(`📊 [NuvemshopClient] Rate limit: ${remaining}/${limit} (${percentage.toFixed(0)}%) requisições restantes`);
      }
    }
    
    if (!response.ok) {
      console.error(`❌ [NuvemshopClient] Erro na requisição - Status: ${response.status}`);
      const error = await response.text();
      console.error(`📄 [NuvemshopClient] Resposta de erro:`, error);
      throw new Error(`Nuvemshop API Error: ${response.status} - ${error}`);
    }
    
    console.log(`✅ [NuvemshopClient] Requisição bem sucedida! Status: ${response.status}`);
    const data = await response.json();
    console.log(`📦 [NuvemshopClient] Dados recebidos:`, JSON.stringify(data).substring(0, 200) + '...');
    
    return data;
  }
  
  // Métodos de conveniência
  async get(endpoint: string) {
    return this.request(endpoint);
  }
  
  async post(endpoint: string, data: unknown) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    });
  }
  
  async put(endpoint: string, data: unknown) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    });
  }
  
  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const nuvemshopClient = new NuvemshopClient();