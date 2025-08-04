import { useCallback } from 'react';
import { useApiRequest } from './useApiRequest';
import { toast } from 'react-hot-toast';

export function useCart() {
  const { request } = useApiRequest();

  const addToCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      const response = await request('/cart/add', {
        method: 'POST',
        data: {
          product_id: productId,
          quantity
        }
      });

      if (response?.success) {
        toast.success('Produto adicionado ao carrinho!');
        return response.data;
      }
    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho');
      throw error;
    }
  }, [request]);

  const removeFromCart = useCallback(async (itemId: number) => {
    try {
      const response = await request(`/cart/remove/${itemId}`, {
        method: 'DELETE'
      });

      if (response?.success) {
        toast.success('Produto removido do carrinho');
        return response.data;
      }
    } catch (error) {
      toast.error('Erro ao remover produto do carrinho');
      throw error;
    }
  }, [request]);

  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    try {
      const response = await request(`/cart/update/${itemId}`, {
        method: 'PATCH',
        data: { quantity }
      });

      if (response?.success) {
        return response.data;
      }
    } catch (error) {
      toast.error('Erro ao atualizar quantidade');
      throw error;
    }
  }, [request]);

  const getCart = useCallback(async () => {
    try {
      const response = await request('/cart', {
        method: 'GET'
      });

      return response?.data;
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      return null;
    }
  }, [request]);

  const clearCart = useCallback(async () => {
    try {
      const response = await request('/cart/clear', {
        method: 'DELETE'
      });

      if (response?.success) {
        toast.success('Carrinho limpo com sucesso');
        return true;
      }
    } catch (error) {
      toast.error('Erro ao limpar carrinho');
      throw error;
    }
  }, [request]);

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart,
    clearCart
  };
}