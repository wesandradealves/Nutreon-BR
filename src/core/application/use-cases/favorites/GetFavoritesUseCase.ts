import { IFavoriteRepository } from '@/core/domain/repositories/IFavoriteRepository';

export class GetFavoritesUseCase {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  async execute(customerId: string): Promise<string[]> {
    const favorites = await this.favoriteRepository.findByCustomerId(customerId);
    return favorites.map(f => f.productId);
  }
}