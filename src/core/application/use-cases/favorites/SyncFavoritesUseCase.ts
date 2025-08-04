import { IFavoriteRepository } from '@/core/domain/repositories/IFavoriteRepository';

export class SyncFavoritesUseCase {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  async execute(customerId: string, cookieFavorites: string[]): Promise<void> {
    if (cookieFavorites.length === 0) return;

    // Busca favoritos existentes do usuário
    const existingFavorites = await this.favoriteRepository.findByCustomerId(customerId);
    const existingProductIds = existingFavorites.map(f => f.productId);

    // Filtra apenas os novos favoritos que não existem no banco
    const newFavorites = cookieFavorites.filter(
      productId => !existingProductIds.includes(productId)
    );

    // Adiciona apenas os novos favoritos
    if (newFavorites.length > 0) {
      await this.favoriteRepository.addMany(customerId, newFavorites);
    }
  }
}