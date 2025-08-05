import { useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/molecules/ProductCard';
import { ProductCardSkeleton } from '@/components/molecules/ProductCard/ProductCardSkeleton';
import { GridContainer, EmptyStateContainer } from './styles';
import type { NuvemshopProduct, NuvemshopCategory } from '@/types';

interface ProductGridProps {
  products: NuvemshopProduct[];
  categories?: NuvemshopCategory[];
  emptyMessage?: string;
  skeletonCount?: number;
  isLoading?: boolean;
}

export function ProductGrid({ 
  products, 
  categories = [], 
  emptyMessage = 'Nenhum produto disponível no momento.',
  skeletonCount = 6,
  isLoading = false
}: ProductGridProps) {
  const gridClasses = useMemo(() => {
    return `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`;
  }, []);

  const getCategoryName = useCallback((product: NuvemshopProduct): string => {
    if (!product.categories?.[0]) return '';
    
    const category = categories.find(cat => cat.id === product.categories![0]);
    if (!category?.name) return '';
    
    return typeof category.name === 'string' 
      ? category.name 
      : category.name.pt || '';
  }, [categories]);

  // Mostra skeleton quando está carregando
  if (isLoading) {
    return (
      <GridContainer className={gridClasses}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </GridContainer>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyStateContainer className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </EmptyStateContainer>
    );
  }

  return (
    <GridContainer className={gridClasses}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          categoryName={getCategoryName(product)}
        />
      ))}
    </GridContainer>
  );
}