'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ProductCard } from '@/components/molecules/ProductCard';
import type { NuvemshopProduct } from '@/types';

const Container = styled.div``;
const SearchSection = styled.section``;
const SearchHeader = styled.div``;
const SearchTitle = styled.h1``;
const SearchInfo = styled.p``;
const SearchInput = styled.input``;
const SearchButton = styled.button``;
const ProductsGrid = styled.div``;
const NoResults = styled.div``;
const LoadingContainer = styled.div``;
const LoadingSpinner = styled.i``;

interface SearchResponse {
  data: NuvemshopProduct[];
  meta?: {
    query?: string;
    total?: number;
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  const searchProducts = async (term: string) => {
    if (!term || term.length < 2) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data: SearchResponse = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && searchTerm.length >= 2) {
      router.push(`/busca?q=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm, router]);


  return (
    <Container className="min-h-screen bg-dark-950">
        <SearchSection className="py-8">
          <div className="container mx-auto px-4">
            <SearchHeader className="mb-8">
              <SearchTitle className="text-3xl font-bold text-white mb-4">
                {query ? `Resultados para "${query}"` : 'Buscar Produtos'}
              </SearchTitle>
              
              {hasSearched && !isLoading && (
                <SearchInfo className="text-gray-400 mb-6">
                  {products.length > 0 
                    ? `${products.length} produto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`
                    : 'Nenhum produto encontrado'
                  }
                </SearchInfo>
              )}

              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="relative">
                  <SearchInput
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full px-4 py-3 pr-32 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                  <SearchButton
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Buscar
                  </SearchButton>
                </div>
              </form>
            </SearchHeader>

            {isLoading ? (
              <LoadingContainer className="flex justify-center py-12">
                <LoadingSpinner className="fas fa-spinner fa-spin text-primary-500 text-3xl" />
              </LoadingContainer>
            ) : products.length > 0 ? (
              <ProductsGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </ProductsGrid>
            ) : hasSearched ? (
              <NoResults className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  Nenhum produto encontrado para sua busca.
                </div>
                <div className="text-gray-500">
                  Tente usar palavras diferentes ou mais genéricas.
                </div>
              </NoResults>
            ) : null}
          </div>
        </SearchSection>
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary-500 text-3xl" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}