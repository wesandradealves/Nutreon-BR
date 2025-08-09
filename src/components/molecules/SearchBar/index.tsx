'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getProductHandle } from '@/utils/product-helpers';
import ProductCardCompact from '@/components/molecules/ProductCardCompact';
import type { NuvemshopProduct } from '@/types';
import {
  SearchOverlay,
  SearchContainer,
  SearchHeader,
  SearchInputWrapper,
  SearchInput,
  SearchIconWrapper,
  CloseButton,
  CloseIcon,
  SearchResults,
  NoResults,
  LoadingSpinner
} from './styles';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResponse {
  data: NuvemshopProduct[];
  meta?: {
    query?: string;
    total?: number;
  };
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<NuvemshopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.length >= 2) {
      setIsLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
          const data: SearchResponse = await response.json();
          setResults(data.data || []);
          setHasSearched(true);
        } catch (error) {
          console.error('Erro na busca:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    } else {
      setResults([]);
      setHasSearched(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleProductClick = useCallback((product: NuvemshopProduct) => {
    const handle = getProductHandle(product.handle);
    if (handle) {
      router.push(`/produto/${handle}`);
      onClose();
      setSearchTerm('');
      setResults([]);
    }
  }, [router, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length >= 2) {
      router.push(`/busca?q=${encodeURIComponent(searchTerm)}`);
      onClose();
      setSearchTerm('');
      setResults([]);
    }
  }, [searchTerm, router, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SearchOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50"
            onClick={onClose}
          />
          
          <SearchContainer
            as={motion.div}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 bg-dark-900 z-50 max-h-[80vh] overflow-hidden"
          >
            <SearchHeader className="container mx-auto px-4 py-6">
              <form onSubmit={handleSubmit}>
                <SearchInputWrapper className="relative">
                  <SearchIconWrapper className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-search text-gray-400 text-lg" />
                  </SearchIconWrapper>
                  
                  <SearchInput
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full pl-12 pr-12 py-4 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  
                  <CloseButton
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <CloseIcon className="fas fa-times text-xl" />
                  </CloseButton>
                </SearchInputWrapper>
              </form>
            </SearchHeader>

            {searchTerm.length >= 2 && (
              <SearchResults className="container mx-auto px-4 pb-6 max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <LoadingSpinner className="flex justify-center py-8">
                    <i className="fas fa-spinner fa-spin text-primary-500 text-2xl" />
                  </LoadingSpinner>
                ) : results.length > 0 ? (
                  <div className="grid gap-2">
                    {results.slice(0, 5).map((product) => (
                      <ProductCardCompact
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                    
                    {results.length > 5 && (
                      <button
                        onClick={handleSubmit}
                        className="text-primary-500 hover:text-primary-400 text-center py-2 transition-colors"
                      >
                        Ver todos os {results.length} resultados →
                      </button>
                    )}
                  </div>
                ) : hasSearched ? (
                  <NoResults className="text-center py-8 text-gray-400">
                    Nenhum produto encontrado para &quot;{searchTerm}&quot;
                  </NoResults>
                ) : null}
              </SearchResults>
            )}
          </SearchContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;