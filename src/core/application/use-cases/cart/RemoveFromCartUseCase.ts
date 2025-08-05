import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class RemoveFromCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(itemId: string): Promise<void> {
    await this.cartRepository.removeItem(itemId);
  }
}