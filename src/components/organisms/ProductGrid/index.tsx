import { ProductCard } from '@/components/molecules/ProductCard';
import { GridContainer, EmptyStateContainer } from './styles';
import type { NuvemshopProduct, NuvemshopCategory } from '@/types';

interface ProductGridProps {
  products: NuvemshopProduct[];
  categories?: NuvemshopCategory[];
  emptyMessage?: string;
}

export function ProductGrid({ 
  products, 
  categories = [], 
  emptyMessage = 'Nenhum produto disponível no momento.'
}: ProductGridProps) {
  const getGridClasses = () => {
    return `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`;
  };

  const getCategoryName = (product: NuvemshopProduct): string => {
    if (!product.categories?.[0]) return '';
    
    const category = categories.find(cat => cat.id === product.categories![0]);
    if (!category?.name) return '';
    
    return typeof category.name === 'string' 
      ? category.name 
      : category.name.pt || '';
  };

  if (products.length === 0) {
    return (
      <EmptyStateContainer className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </EmptyStateContainer>
    );
  }

  return (
    <GridContainer className={getGridClasses()}>
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