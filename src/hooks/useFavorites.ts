'use client';

import { useState, useCallback, useEffect } from 'react';
import { useApiRequest } from './useApiRequest';
import { useAuth } from '@/context/auth';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const FAVORITES_COOKIE_KEY = 'nutreon_favorites';
const COOKIE_EXPIRY_DAYS = 30;

interface FavoritesResponse {
  data?: string[] | { data: string[] };
}

interface ToggleFavoriteResponse {
  data?: { added: boolean } | { data: { added: boolean } };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { request: requestFavorites } = useApiRequest<FavoritesResponse>();
  const { request: requestToggle } = useApiRequest<ToggleFavoriteResponse>();
  const { request: requestSync } = useApiRequest<FavoritesResponse>();
  const { isAuthenticated } = useAuth();

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        // Usuário logado: busca do banco
        const response = await requestFavorites('/api/favorites', { method: 'GET' });
        
        if (response?.success && response.data) {
          // Verifica se os dados estão aninhados
          let favoritesArray: string[] = [];
          if (Array.isArray(response.data)) {
            favoritesArray = response.data;
          } else if ('data' in response.data && Array.isArray((response.data as { data: string[] }).data)) {
            favoritesArray = (response.data as { data: string[] }).data;
          }
          setFavorites(favoritesArray);
          // Limpa cookies após sincronizar
          Cookies.remove(FAVORITES_COOKIE_KEY);
        } else {
          setFavorites([]);
        }
      } else {
        // Usuário não logado: busca dos cookies
        const cookieFavorites = Cookies.get(FAVORITES_COOKIE_KEY);
        if (cookieFavorites) {
          try {
            const parsed = JSON.parse(cookieFavorites);
            setFavorites(Array.isArray(parsed) ? parsed : []);
          } catch {
            setFavorites([]);
          }
        } else {
          setFavorites([]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, requestFavorites]);

  // Carrega favoritos ao montar ou quando autenticação mudar
  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated, loadFavorites]);

  const toggleFavorite = useCallback(async (productId: string) => {
    try {
      if (isAuthenticated) {
        // Usuário logado: salva no banco
        const response = await requestToggle('/api/favorites', {
          method: 'POST',
          data: { productId }
        });

        if (response?.success && response.data) {
          // Verifica se os dados estão aninhados
          let added = false;
          
          if ('data' in response.data && typeof response.data.data === 'object' && response.data.data !== null && 'added' in response.data.data) {
            added = (response.data.data as { added: boolean }).added;
          } else if ('added' in response.data) {
            added = (response.data as { added: boolean }).added;
          }
          
          if (added) {
            setFavorites(prev => [...prev, productId]);
            toast.success('Produto adicionado aos favoritos!');
          } else {
            setFavorites(prev => prev.filter(id => id !== productId));
            toast.success('Produto removido dos favoritos!');
          }
        }
      } else {
        // Usuário não logado: salva em cookies
        const currentFavorites = Array.isArray(favorites) ? favorites : [];
        const isFavorite = currentFavorites.includes(productId);
        let newFavorites: string[];

        if (isFavorite) {
          newFavorites = currentFavorites.filter(id => id !== productId);
          toast.success('Produto removido dos favoritos!');
        } else {
          newFavorites = [...currentFavorites, productId];
          toast.success('Produto adicionado aos favoritos!');
        }

        setFavorites(newFavorites);
        Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(newFavorites), { 
          expires: COOKIE_EXPIRY_DAYS 
        });
      }
    } catch (error) {
      toast.error('Erro ao atualizar favoritos');
      console.error('Erro ao toggle favorito:', error);
    }
  }, [isAuthenticated, favorites, requestToggle]);

  const isFavorite = useCallback((productId: string) => {
    return Array.isArray(favorites) && favorites.includes(productId);
  }, [favorites]);

  const syncFavoritesOnLogin = useCallback(async () => {
    // Busca favoritos dos cookies
    const cookieFavorites = Cookies.get(FAVORITES_COOKIE_KEY);
    if (!cookieFavorites) return;

    try {
      const parsed = JSON.parse(cookieFavorites);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      // Sincroniza com o banco
      await requestSync('/api/favorites/sync', {
        method: 'POST',
        data: { favorites: parsed }
      });

      // Limpa cookies após sincronizar
      Cookies.remove(FAVORITES_COOKIE_KEY);
      
      // Recarrega favoritos do banco
      await loadFavorites();
    } catch (error) {
      console.error('Erro ao sincronizar favoritos:', error);
    }
  }, [requestSync, loadFavorites]);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    syncFavoritesOnLogin,
    loadFavorites
  };
}