import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class RemoveFromCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(itemId: string): Promise<void> {
    console.log('[RemoveFromCartUseCase] Removendo item:', itemId);
    
    // Primeiro busca o item para obter o cartId
    const cartItem = await this.cartRepository.getCartItem(itemId);
    
    if (!cartItem) {
      throw new Error('Item não encontrado');
    }
    
    console.log('[RemoveFromCartUseCase] Item encontrado, cartId:', cartItem.cartId);
    
    // Remove o item
    await this.cartRepository.removeItem(itemId);
    console.log('[RemoveFromCartUseCase] Item removido');
    
    // Busca o carrinho com os itens restantes
    const cart = await this.cartRepository.getCartWithItems(cartItem.cartId);
    console.log('[RemoveFromCartUseCase] Itens restantes no carrinho:', cart?.items.length || 0);
    
    // Se o carrinho existe mas não tem mais itens, deleta o carrinho
    if (cart && cart.items.length === 0) {
      console.log('[RemoveFromCartUseCase] Carrinho vazio, deletando:', cartItem.cartId);
      await this.cartRepository.delete(cartItem.cartId);
      console.log('[RemoveFromCartUseCase] Carrinho deletado');
    }
  }
}