import type { Cart, CartItem } from '@prisma/client';

export interface ICartRepository {
  create(data: {
    customerId?: string | null;
    sessionId?: string | null;
    expiresAt: Date;
  }): Promise<Cart>;

  findById(id: string): Promise<Cart | null>;
  
  findByCustomerId(customerId: string): Promise<Cart | null>;
  
  findBySessionId(sessionId: string): Promise<Cart | null>;
  
  update(id: string, data: Partial<Cart>): Promise<Cart>;
  
  delete(id: string): Promise<void>;
  
  deleteExpired(): Promise<number>;
  
  // Cart Items
  addItem(cartId: string, item: {
    productId: string;
    variantId?: string | null;
    quantity: number;
    name: string;
    image: string;
    price: number;
  }): Promise<CartItem>;
  
  updateItem(id: string, quantity: number): Promise<CartItem>;
  
  removeItem(id: string): Promise<void>;
  
  clearItems(cartId: string): Promise<void>;
  
  getCartWithItems(cartId: string): Promise<(Cart & { items: CartItem[] }) | null>;
}