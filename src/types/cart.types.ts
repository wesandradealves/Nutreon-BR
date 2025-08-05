export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId?: string | null;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
  maxQuantity?: number;
}

export interface Cart {
  id: string;
  customerId?: string | null;
  sessionId?: string | null;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  coupon?: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

export interface CalculateShippingPayload {
  zipCode: string;
  items: CartItem[];
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}