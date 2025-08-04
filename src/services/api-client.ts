import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Cliente unificado para APIs internas e externas
class ApiClient {
  private internalClient: AxiosInstance;
  private externalClient: AxiosInstance;
  private loadingCallback?: (loading: boolean) => void;
  private requestQueue: Array<() => void> = [];
  private isProcessingQueue = false;
  private readonly RATE_LIMIT_DELAY = 500;

  constructor() {
    // Cliente para APIs internas
    this.internalClient = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Cliente para API externa (Nuvemshop)
    this.externalClient = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL}/${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION}`,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
      },
    });

    this.setupInternalInterceptors();
    this.setupExternalInterceptors();
  }

  private async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) return;
    
    this.isProcessingQueue = true;
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) request();
      await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY));
    }
    this.isProcessingQueue = false;
  }

  private setupInternalInterceptors() {
    // Request interceptor
    this.internalClient.interceptors.request.use(
      (config) => {
        if (this.loadingCallback) this.loadingCallback(true);
        return config;
      },
      (error) => {
        if (this.loadingCallback) this.loadingCallback(false);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.internalClient.interceptors.response.use(
      (response) => {
        if (this.loadingCallback) this.loadingCallback(false);
        return response;
      },
      (error) => {
        if (this.loadingCallback) this.loadingCallback(false);
        return Promise.reject(error);
      }
    );
  }

  private setupExternalInterceptors() {
    // Request interceptor com rate limiting
    this.externalClient.interceptors.request.use(
      async (config) => {
        // Rate limiting
        await new Promise<void>((resolve) => {
          this.requestQueue.push(resolve);
          this.processQueue();
        });

        if (this.loadingCallback) this.loadingCallback(true);

        // Add store ID to URL if available
        const storeId = process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID;
        if (storeId && config.url && !config.url.includes(storeId)) {
          config.url = `/${storeId}${config.url}`;
        }

        // Add authentication token
        const token = typeof window !== 'undefined' ? 
          (localStorage.getItem('nuvemshop_token') || process.env.NUVEMSHOP_ACCESS_TOKEN) : 
          process.env.NUVEMSHOP_ACCESS_TOKEN;
        
        if (token) {
          config.headers.Authentication = `bearer ${token}`;
        }

        // Add language header
        const locale = typeof window !== 'undefined' ? 
          (localStorage.getItem('locale') || 'pt-BR') : 'pt-BR';
        config.headers['Accept-Language'] = locale;

        return config;
      },
      (error) => {
        if (this.loadingCallback) this.loadingCallback(false);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.externalClient.interceptors.response.use(
      (response) => {
        if (this.loadingCallback) this.loadingCallback(false);
        
        // Check rate limit headers
        const remaining = response.headers['x-rate-limit-remaining'];
        const limit = response.headers['x-rate-limit-limit'];
        
        if (remaining && limit) {
          console.log(`Rate limit: ${remaining}/${limit} requests remaining`);
          
          if (parseInt(remaining) < 5) {
            console.warn('Approaching rate limit, slowing down requests');
          }
        }
        
        return response;
      },
      (error) => {
        if (this.loadingCallback) this.loadingCallback(false);
        
        // Handle rate limit errors
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded. Please wait before making more requests.');
          const resetTime = error.response.headers['x-rate-limit-reset'];
          if (resetTime) {
            console.log(`Rate limit resets at: ${new Date(parseInt(resetTime) * 1000).toLocaleString()}`);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  public setLoadingCallback(callback: (loading: boolean) => void) {
    this.loadingCallback = callback;
  }

  // Método request unificado
  public async request<T = unknown>(
    url: string,
    config?: AxiosRequestConfig & { isExternal?: boolean }
  ): Promise<T> {
    const { isExternal = false, ...axiosConfig } = config || {};
    const client = isExternal ? this.externalClient : this.internalClient;
    
    const response = await client.request<T>({
      url,
      ...axiosConfig,
    });
    
    return response.data;
  }
}

export const apiClient = new ApiClient();