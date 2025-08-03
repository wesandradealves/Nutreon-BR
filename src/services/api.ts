import axios from 'axios';

// Configuração base do Axios para Nuvemshop API
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL}/${process.env.NEXT_PUBLIC_NUVEMSHOP_API_VERSION}`,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${process.env.NEXT_PUBLIC_APP_NAME}/1.0.0`,
  },
});

// Rate limit state
const requestQueue: Array<() => void> = [];
let isProcessingQueue = false;
const RATE_LIMIT_DELAY = 500; // 2 requests per second = 500ms between requests

// Process queue with rate limiting
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) request();
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
  }
  isProcessingQueue = false;
};

// Setup interceptors with rate limiting
export const setupInterceptors = (setLoading: (loading: boolean) => void, getLocale?: () => string) => {
  api.interceptors.request.use(
    async (config) => {
      // Wait for rate limit queue if needed
      await new Promise<void>((resolve) => {
        requestQueue.push(resolve);
        processQueue();
      });

      setLoading(true);

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
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add language header
      const locale = getLocale ? getLocale() : 
        (typeof window !== 'undefined' ? (localStorage.getItem('locale') || 'pt-BR') : 'pt-BR');
      config.headers['Accept-Language'] = locale;

      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      
      // Check rate limit headers
      const remaining = response.headers['x-rate-limit-remaining'];
      const limit = response.headers['x-rate-limit-limit'];
      
      if (remaining && limit) {
        console.log(`Rate limit: ${remaining}/${limit} requests remaining`);
        
        // If we're getting close to the limit, slow down
        if (parseInt(remaining) < 5) {
          console.warn('Approaching rate limit, slowing down requests');
        }
      }
      
      return response;
    },
    (error) => {
      setLoading(false);
      
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
};


export default api;
