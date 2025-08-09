'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './auth';
import { useCartDrawer } from './cartDrawer';
import { apiClient } from '@/services/api-client';
import { toast } from 'react-hot-toast';
import type { Cart } from '@/types/cart.types';

interface CartContextData {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (productId: string, variantId?: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  calculateShipping: (zipCode: string) => Promise<void>;
  getProductQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();
  const { openDrawer } = useCartDrawer();

  // Calcula totais com memoização
  const itemCount = useMemo(() => 
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0, 
    [cart?.items]
  );
  
  const subtotal = useMemo(() => cart?.subtotal || 0, [cart?.subtotal]);
  
  const total = useMemo(() => 
    subtotal + shipping - (cart?.discount || 0), 
    [subtotal, shipping, cart?.discount]
  );

  // Obtém quantidade de um produto no carrinho
  const getProductQuantity = useCallback((productId: string) => {
    if (!cart?.items) return 0;
    const item = cart.items.find(item => item.productId === productId);
    return item?.quantity || 0;
  }, [cart?.items]);

  // Carrega carrinho
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      console.log('[CartContext] Carregando carrinho...');
      const response = await apiClient.request<{ success: boolean; data: Cart }>('/api/cart', {
        method: 'GET'
      });
      
      if (response.success && response.data) {
        console.log('[CartContext] Carrinho carregado:', response.data);
        setCart(response.data);
      }
    } catch (error) {
      console.error('[CartContext] Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adiciona item ao carrinho
  const addToCart = useCallback(async (productId: string, variantId?: string, quantity: number = 1) => {
    try {
      const response = await apiClient.request<{ success: boolean; data: unknown }>('/api/cart', {
        method: 'POST',
        data: {
          productId,
          variantId,
          quantity,
        }
      });

      if (response.success) {
        toast.success('Produto adicionado ao carrinho!');
        await loadCart(); // Recarrega carrinho
        openDrawer(); // Abre o drawer do carrinho
      }
    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho');
      throw error;
    }
  }, [loadCart, openDrawer]);

  // Atualiza quantidade
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      const response = await apiClient.request<{ success: boolean; data: unknown }>(`/api/cart/${itemId}`, {
        method: 'PATCH',
        data: { quantity }
      });

      if (response.success) {
        if (quantity === 0) {
          toast.success('Produto removido do carrinho');
        }
        await loadCart();
      }
    } catch (error) {
      toast.error('Erro ao atualizar quantidade');
      throw error;
    }
  }, [loadCart]);

  // Remove item
  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      const response = await apiClient.request<{ success: boolean; data: unknown }>(`/api/cart/${itemId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        toast.success('Produto removido do carrinho');
        
        // Se o carrinho tinha apenas 1 item, limpa o estado local
        if (cart && cart.items.length === 1) {
          console.log('[CartContext] Último item removido, limpando estado local');
          setCart(null);
          // NÃO recarrega o carrinho
        } else {
          // Senão, recarrega o carrinho
          await loadCart();
        }
      }
    } catch (error) {
      toast.error('Erro ao remover produto');
      throw error;
    }
  }, [cart, loadCart]);

  // Limpa carrinho
  const clearCart = useCallback(async () => {
    try {
      console.log('[CartContext] Limpando carrinho...');
      const response = await apiClient.request<{ success: boolean; data: unknown }>('/api/cart', {
        method: 'DELETE'
      });

      if (response.success) {
        console.log('[CartContext] Carrinho limpo com sucesso');
        toast.success('Carrinho limpo com sucesso');
        // Apenas limpa o estado local, não recarrega
        setCart(null);
        console.log('[CartContext] Estado local limpo');
        // NÃO chama loadCart() aqui para evitar criar novo carrinho
      }
    } catch (error) {
      console.error('[CartContext] Erro ao limpar carrinho:', error);
      toast.error('Erro ao limpar carrinho');
      throw error;
    }
  }, []);

  // Calcula frete
  const calculateShipping = useCallback(async (zipCode: string) => {
    try {
      const response = await apiClient.request<{ success: boolean; data: { selectedOption: { price: number } } }>('/api/cart/shipping', {
        method: 'POST',
        data: {
          zipCode,
          subtotal,
        }
      });

      if (response.success && response.data) {
        const selectedOption = response.data.selectedOption;
        setShipping(selectedOption.price);
      }
    } catch (error) {
      toast.error('Erro ao calcular frete');
      throw error;
    }
  }, [subtotal]);

  // Sincroniza carrinho ao fazer login
  const syncCartOnLogin = useCallback(async () => {
    if (!mounted) return;
    
    try {
      await apiClient.request('/api/cart/sync', {
        method: 'POST'
      });
      await loadCart();
    } catch (error) {
      // Ignora erro 401 se não estiver autenticado
      if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
        return;
      }
      console.error('Erro ao sincronizar carrinho:', error);
    }
  }, [loadCart, mounted]);

  // Marca como mounted após carregar no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Carrega carrinho ao montar no cliente (apenas uma vez)
  useEffect(() => {
    if (mounted) {
      loadCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez ao montar

  // Sincroniza ao fazer login
  useEffect(() => {
    if (mounted && isAuthenticated) {
      syncCartOnLogin();
    }
  }, [isAuthenticated, syncCartOnLogin, mounted]);

  // Atualiza o título da página com a quantidade de itens
  useEffect(() => {
    if (mounted) {
      const baseTitle = 'Nutreon BR';
      if (itemCount > 0) {
        document.title = `(${itemCount}) ${baseTitle}`;
      } else {
        document.title = baseTitle;
      }
    }
  }, [itemCount, mounted]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        subtotal,
        shipping,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loadCart,
        calculateShipping,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  
  return context;
}