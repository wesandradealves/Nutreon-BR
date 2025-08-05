import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';
import { CartItem } from '@prisma/client';

export class UpdateCartItemUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(params: {
    itemId: string;
    quantity: number;
  }): Promise<CartItem> {
    // Se quantidade for 0, remove o item
    if (params.quantity === 0) {
      await this.cartRepository.removeItem(params.itemId);
      throw new Error('Item removido do carrinho');
    }

    // Validação
    if (params.quantity < 0) {
      throw new Error('Quantidade inválida');
    }

    // Atualiza quantidade
    const updatedItem = await this.cartRepository.updateItem(
      params.itemId,
      params.quantity
    );

    return updatedItem;
  }
}