import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';
import { Cart, CartItem } from '@prisma/client';

export class GetCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(cartId: string): Promise<(Cart & { items: CartItem[] }) | null> {
    return await this.cartRepository.getCartWithItems(cartId);
  }
}