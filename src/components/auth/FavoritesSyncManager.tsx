'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useFavoritesContext } from '@/context/favorites';

export function FavoritesSyncManager() {
  const { isAuthenticated, customer } = useAuth();
  const { syncFavoritesOnLogin } = useFavoritesContext();

  useEffect(() => {
    // Quando o usuário fizer login, sincronizar favoritos
    if (isAuthenticated && customer) {
      syncFavoritesOnLogin();
    }
  }, [isAuthenticated, customer, syncFavoritesOnLogin]);

  return null;
}