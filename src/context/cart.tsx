'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
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
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();
  const { openDrawer } = useCartDrawer();

  // Calcula totais
  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const subtotal = cart?.subtotal || 0;
  const total = subtotal + shipping - (cart?.discount || 0);

  // Carrega carrinho
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.request<{ success: boolean; data: Cart }>('/api/cart', {
        method: 'GET'
      });
      
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
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
        await loadCart();
      }
    } catch (error) {
      toast.error('Erro ao remover produto');
      throw error;
    }
  }, [loadCart]);

  // Limpa carrinho
  const clearCart = useCallback(async () => {
    try {
      const response = await apiClient.request<{ success: boolean; data: unknown }>('/api/cart', {
        method: 'DELETE'
      });

      if (response.success) {
        toast.success('Carrinho limpo com sucesso');
        setCart(null);
        await loadCart();
      }
    } catch (error) {
      toast.error('Erro ao limpar carrinho');
      throw error;
    }
  }, [loadCart]);

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

  // Carrega carrinho ao montar no cliente
  useEffect(() => {
    if (mounted) {
      loadCart();
    }
  }, [loadCart, mounted]);

  // Sincroniza ao fazer login
  useEffect(() => {
    if (mounted && isAuthenticated) {
      syncCartOnLogin();
    }
  }, [isAuthenticated, syncCartOnLogin, mounted]);

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