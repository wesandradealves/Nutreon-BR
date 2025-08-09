'use client';

import { useCallback, useState } from 'react';
import { useFavoritesContext } from '@/context/favorites';

export function useFavoriteActions() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [loadingFavorites, setLoadingFavorites] = useState<string[]>([]);

  const handleToggleFavorite = useCallback(async (productId: string) => {
    setLoadingFavorites(prev => [...prev, productId]);
    try {
      await toggleFavorite(productId);
      // Toast já é mostrado internamente pelo toggleFavorite em useFavorites.ts
    } catch (error) {
      // Erro já é tratado internamente pelo toggleFavorite
      console.error('Erro ao toggle favorito:', error);
    } finally {
      setLoadingFavorites(prev => prev.filter(id => id !== productId));
    }
  }, [toggleFavorite]);

  return {
    isFavorite,
    handleToggleFavorite,
    loadingFavorites
  };
}