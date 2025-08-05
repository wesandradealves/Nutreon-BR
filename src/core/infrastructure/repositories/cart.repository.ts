import { PrismaClient, Cart, CartItem } from '@prisma/client';
import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class PrismaCartRepository implements ICartRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    customerId?: string | null;
    sessionId?: string | null;
    expiresAt: Date;
  }): Promise<Cart> {
    return this.prisma.cart.create({
      data,
    });
  }

  async findById(id: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { id },
    });
  }

  async findByCustomerId(customerId: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { customerId },
    });
  }

  async findBySessionId(sessionId: string): Promise<Cart | null> {
    return this.prisma.cart.findFirst({
      where: { sessionId },
    });
  }

  async update(id: string, data: Partial<Cart>): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cart.delete({
      where: { id },
    });
  }

  async deleteExpired(): Promise<number> {
    const result = await this.prisma.cart.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  }

  async addItem(cartId: string, item: {
    productId: string;
    variantId?: string | null;
    quantity: number;
    name: string;
    image: string;
    price: number;
  }): Promise<CartItem> {
    // Tenta atualizar item existente primeiro
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId,
        productId: item.productId,
        variantId: item.variantId,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + item.quantity,
        },
      });
    }

    // Se não existe, cria novo
    return this.prisma.cartItem.create({
      data: {
        cartId,
        ...item,
      },
    });
  }

  async updateItem(id: string, quantity: number): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  async removeItem(id: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id },
    });
  }

  async clearItems(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  async getCartWithItems(cartId: string): Promise<(Cart & { items: CartItem[] }) | null> {
    return this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
}