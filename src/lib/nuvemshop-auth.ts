/**
 * Solução de autenticação para loja única
 * Para produção, configure as variáveis no servidor
 */

interface AuthConfig {
  storeId: string;
  accessToken: string;
  apiUrl: string;
}

class NuvemshopAuth {
  private config: AuthConfig;
  
  constructor() {
    // Em produção, essas variáveis vêm do ambiente do servidor
    this.config = {
      storeId: process.env.NUVEMSHOP_STORE_ID || process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID || '',
      accessToken: process.env.NUVEMSHOP_ACCESS_TOKEN || '',
      apiUrl: process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL || 'https://api.tiendanube.com',
    };
    
    // Validar configuração na inicialização
    this.validateConfig();
  }
  
  private validateConfig() {
    if (!this.config.storeId || !this.config.accessToken) {
      console.error('❌ [Auth] Configuração incompleta!');
      console.error('Configure as seguintes variáveis de ambiente:');
      console.error('- NUVEMSHOP_STORE_ID');
      console.error('- NUVEMSHOP_ACCESS_TOKEN');
      
      // Em desenvolvimento, pode continuar sem token
      // Em produção, deveria lançar erro
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Configuração de autenticação ausente');
      }
    }
  }
  
  getHeaders(): Record<string, string> {
    return {
      'Authentication': `bearer ${this.config.accessToken}`,
      'User-Agent': 'Nutreon/1.0.0',
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR',
    };
  }
  
  getStoreId(): string {
    return this.config.storeId;
  }
  
  getApiUrl(): string {
    return this.config.apiUrl;
  }
  
  isConfigured(): boolean {
    return !!(this.config.storeId && this.config.accessToken);
  }
}

// Singleton para toda a aplicação
export const auth = new NuvemshopAuth();