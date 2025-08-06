'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { useFavoritesContext } from '@/context/favorites';
import { useApiRequest } from '@/hooks/useApiRequest';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  Container,
  PageHeader,
  PageTitle,
  PageDescription,
  EmptyStateContainer,
  EmptyIcon,
  EmptyMessage,
  ExploreButton,
  ContentWrapper,
  EmptyTitle
} from './styles';
import type { NuvemshopProduct } from '@/types';
import { useMetadata } from '@/hooks/useMetadata';

interface ProductsResponse {
  data?: NuvemshopProduct[] | { data: NuvemshopProduct[] } | { products: NuvemshopProduct[] };
}

export default function FavoritosPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavoritesContext();
  const { request } = useApiRequest<ProductsResponse>();
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useMetadata({
    title: `Nutreon BR - Favoritos`,
    ogTitle: `Nutreon BR - Favoritos`
  });

  const loadFavoriteProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Por enquanto vamos buscar todos os produtos e filtrar
      // Idealmente, a API deveria aceitar uma lista de IDs
      const response = await request('/api/products', { method: 'GET' });
      
      if (response?.success && response.data) {
        // Verifica a estrutura de dados retornada
        let productsArray: NuvemshopProduct[] = [];
        if (Array.isArray(response.data)) {
          productsArray = response.data;
        } else if ('data' in response.data && Array.isArray((response.data as { data: NuvemshopProduct[] }).data)) {
          productsArray = (response.data as { data: NuvemshopProduct[] }).data;
        } else if ('products' in response.data && Array.isArray((response.data as { products: NuvemshopProduct[] }).products)) {
          productsArray = (response.data as { products: NuvemshopProduct[] }).products;
        }
        
        const favoriteProducts = productsArray.filter((product: NuvemshopProduct) => 
          favorites.includes(product.id.toString())
        );
        setProducts(favoriteProducts);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, [request, favorites]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (favorites.length > 0 && !favoritesLoading) {
      loadFavoriteProducts();
    } else if (!favoritesLoading) {
      setProducts([]);
      setLoading(false);
    }
  }, [favorites, favoritesLoading, loadFavoriteProducts]);

  if (!isMounted) {
    return null;
  }

  return (
    <ProtectedRoute>
      <Container className="min-h-screen bg-gray-50 py-8">
        <ContentWrapper className="container mx-auto px-4">
          <PageHeader className="bg-white rounded-lg shadow-md p-6 mb-8">
            <PageTitle className="text-2xl font-bold text-gray-800 mb-2">Meus Favoritos</PageTitle>
            <PageDescription className="text-gray-600">
              {favorites.length === 0 
                ? 'Você ainda não tem produtos favoritos.' 
                : `Você tem ${favorites.length} produto${favorites.length === 1 ? '' : 's'} favorito${favorites.length === 1 ? '' : 's'}.`
              }
            </PageDescription>
          </PageHeader>

          {favorites.length === 0 && !loading && !favoritesLoading ? (
            <EmptyStateContainer className="bg-white rounded-lg shadow-md p-12 text-center">
              <EmptyIcon className="text-6xl text-gray-300 mb-4">❤️</EmptyIcon>
              <EmptyTitle className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum favorito ainda
              </EmptyTitle>
              <EmptyMessage className="text-gray-600 mb-6">
                Explore nossos produtos e adicione seus favoritos para acessá-los facilmente!
              </EmptyMessage>
              <ExploreButton
                onClick={() => router.push('/')}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Explorar Produtos
              </ExploreButton>
            </EmptyStateContainer>
          ) : (
            <ProductGrid 
              products={products} 
              emptyMessage="Nenhum produto favorito encontrado."
              isLoading={loading || favoritesLoading}
            />
          )}
        </ContentWrapper>
      </Container>
    </ProtectedRoute>
  );
}