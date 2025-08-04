'use client';

import { useState, useCallback, useEffect } from 'react';
import { useApiRequest } from './useApiRequest';
import { useAuth } from '@/context/auth';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const FAVORITES_COOKIE_KEY = 'nutreon_favorites';
const COOKIE_EXPIRY_DAYS = 30;

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { request } = useApiRequest();
  const { isAuthenticated } = useAuth();

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        // Usuário logado: busca do banco
        const response = await request('/api/favorites', { method: 'GET' });
        
        if (response?.success && response.data) {
          // Verifica se os dados estão aninhados
          let favoritesArray = [];
          if (Array.isArray(response.data)) {
            favoritesArray = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            favoritesArray = response.data.data;
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
  }, [isAuthenticated, request]);

  // Carrega favoritos ao montar ou quando autenticação mudar
  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated, loadFavorites]);

  const toggleFavorite = useCallback(async (productId: string) => {
    try {
      if (isAuthenticated) {
        // Usuário logado: salva no banco
        const response = await request('/api/favorites', {
          method: 'POST',
          data: { productId }
        });

        if (response?.success && response.data) {
          // Verifica se os dados estão aninhados
          const toggleResult = response.data.data || response.data;
          
          if (toggleResult.added) {
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
  }, [isAuthenticated, favorites, request]);

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
      await request('/api/favorites/sync', {
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
  }, [request, loadFavorites]);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    syncFavoritesOnLogin,
    loadFavorites
  };
}