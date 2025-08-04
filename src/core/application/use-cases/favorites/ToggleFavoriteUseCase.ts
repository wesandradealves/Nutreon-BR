import { IFavoriteRepository } from '@/core/domain/repositories/IFavoriteRepository';

export class ToggleFavoriteUseCase {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  async execute(customerId: string, productId: string): Promise<{ added: boolean }> {
    const isFavorite = await this.favoriteRepository.findByCustomerAndProduct(customerId, productId);

    if (isFavorite) {
      await this.favoriteRepository.remove(customerId, productId);
      return { added: false };
    } else {
      await this.favoriteRepository.add(customerId, productId);
      return { added: true };
    }
  }
}