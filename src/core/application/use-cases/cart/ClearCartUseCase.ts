import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class ClearCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(cartId: string): Promise<void> {
    await this.cartRepository.clearItems(cartId);
  }
}