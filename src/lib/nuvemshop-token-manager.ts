import { cookies } from 'next/headers';

interface TokenData {
  access_token: string;
  user_id: string;
  expires_at?: number;
}

class NuvemshopTokenManager {
  private static instance: NuvemshopTokenManager;
  private tokenData: TokenData | null = null;
  
  private constructor() {}
  
  static getInstance(): NuvemshopTokenManager {
    if (!NuvemshopTokenManager.instance) {
      NuvemshopTokenManager.instance = new NuvemshopTokenManager();
    }
    return NuvemshopTokenManager.instance;
  }
  
  async getToken(): Promise<string | null> {
    // Primeiro, tentar pegar o token do ambiente (para desenvolvimento)
    if (process.env.NUVEMSHOP_ACCESS_TOKEN) {
      return process.env.NUVEMSHOP_ACCESS_TOKEN;
    }
    
    // Depois, tentar pegar dos cookies (produção com OAuth)
    try {
      const cookieStore = await cookies();
      const tokenCookie = cookieStore.get('nuvemshop_token');
      
      if (tokenCookie) {
        return tokenCookie.value;
      }
    } catch (error) {
      console.error('💥 [TokenManager] Erro ao buscar token dos cookies:', error);
    }
    
    // Se não encontrar, tentar fazer OAuth automaticamente
    return await this.performOAuth();
  }
  
  async getUserId(): Promise<string | null> {
    // Primeiro, tentar pegar do ambiente
    if (process.env.NEXT_PUBLIC_NUVEMSHOP_USER_ID) {
      return process.env.NEXT_PUBLIC_NUVEMSHOP_USER_ID;
    }
    
    // Depois, tentar pegar dos cookies
    try {
      const cookieStore = await cookies();
      const userIdCookie = cookieStore.get('nuvemshop_user_id');
      
      if (userIdCookie) {
        return userIdCookie.value;
      }
    } catch (error) {
      console.error('💥 [TokenManager] Erro ao buscar user_id dos cookies:', error);
    }
    
    if (process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID) {
      return process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID;
    }
    
    return null;
  }
  
  private async performOAuth(): Promise<string | null> {
    console.log('🚀 [TokenManager] Executando OAuth automático...');
    
    // Em desenvolvimento, usar o token do .env
    if (process.env.NODE_ENV === 'development' && process.env.NUVEMSHOP_ACCESS_TOKEN) {
      console.log('🛠️ [TokenManager] Modo desenvolvimento - usando token do .env');
      return process.env.NUVEMSHOP_ACCESS_TOKEN;
    }
    
    console.log('⚠️ [TokenManager] OAuth automático ainda não implementado para produção');
    console.log('💡 [TokenManager] Configure NUVEMSHOP_ACCESS_TOKEN no .env para desenvolvimento');
    
    // Em produção, seria necessário implementar um fluxo OAuth server-side
    // Por enquanto, retornar null e deixar o BFF lidar com o erro
    return null;
  }
  
  async validateToken(token: string): Promise<boolean> {
    console.log('🔍 [TokenManager] Validando token...');
    
    try {
      const userId = await this.getUserId();
      if (!userId) {
        console.log('❌ [TokenManager] Não foi possível validar - User ID não encontrado');
        return false;
      }
      
      console.log(`🌐 [TokenManager] Fazendo requisição de teste para API...`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL}/${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION}/${userId}/store`,
        {
          headers: {
            'Authentication': `bearer ${token}`,
            'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
          },
        }
      );
      
      if (response.ok) {
        console.log('✅ [TokenManager] Token válido!');
      } else {
        console.log(`❌ [TokenManager] Token inválido - Status: ${response.status}`);
      }
      
      return response.ok;
    } catch (error) {
      console.error('💥 [TokenManager] Erro ao validar token:', error);
      return false;
    }
  }
  
  // Método para configurar o token manualmente (útil para testes)
  setToken(token: string, userId: string) {
    this.tokenData = {
      access_token: token,
      user_id: userId,
    };
  }
}

export const tokenManager = NuvemshopTokenManager.getInstance();