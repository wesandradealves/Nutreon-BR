import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class ClearCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(cartId: string): Promise<void> {
    console.log('[ClearCartUseCase] Limpando carrinho:', cartId);
    
    // Limpa todos os itens do carrinho
    await this.cartRepository.clearItems(cartId);
    console.log('[ClearCartUseCase] Itens limpos do carrinho:', cartId);
    
    // Deleta o carrinho vazio
    await this.cartRepository.delete(cartId);
    console.log('[ClearCartUseCase] Carrinho deletado:', cartId);
  }
}