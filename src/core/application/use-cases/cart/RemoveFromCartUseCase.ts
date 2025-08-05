import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class RemoveFromCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(itemId: string): Promise<void> {
    // Primeiro busca o item para obter o cartId
    const cartItem = await this.cartRepository.getCartItem(itemId);
    
    if (!cartItem) {
      throw new Error('Item não encontrado');
    }
    
    // Remove o item
    await this.cartRepository.removeItem(itemId);
    
    // Busca o carrinho com os itens restantes
    const cart = await this.cartRepository.getCartWithItems(cartItem.cartId);
    
    // Se o carrinho existe mas não tem mais itens, deleta o carrinho
    if (cart && cart.items.length === 0) {
      await this.cartRepository.delete(cartItem.cartId);
    }
  }
}