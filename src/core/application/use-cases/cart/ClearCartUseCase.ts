import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class ClearCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(cartId: string): Promise<void> {
    // Limpa todos os itens do carrinho
    await this.cartRepository.clearItems(cartId);
    
    // Deleta o carrinho vazio
    await this.cartRepository.delete(cartId);
  }
}