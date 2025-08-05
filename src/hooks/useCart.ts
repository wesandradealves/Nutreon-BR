'use client';

import { useCartContext } from '@/context/cart';

export function useCart() {
  const cartContext = useCartContext();
  
  // Retorna os métodos do context diretamente
  return {
    // Estado
    cart: cartContext.cart,
    loading: cartContext.loading,
    itemCount: cartContext.itemCount,
    subtotal: cartContext.subtotal,
    shipping: cartContext.shipping,
    total: cartContext.total,
    
    // Métodos
    addToCart: cartContext.addToCart,
    removeFromCart: cartContext.removeFromCart,
    removeItem: cartContext.removeFromCart, // alias para compatibilidade
    updateQuantity: cartContext.updateQuantity,
    getCart: cartContext.loadCart,
    clearCart: cartContext.clearCart,
    calculateShipping: cartContext.calculateShipping,
  };
}