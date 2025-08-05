'use client';

import { useEffect, useState, useCallback } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  PageContainer,
  ContentSection,
  Subtitle,
} from './styles';
import type { NuvemshopProduct, NuvemshopCategory } from '@/types';

interface StoreInfo {
  name: { pt?: string; [key: string]: string | undefined };
  email: string;
  country: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [categories, setCategories] = useState<NuvemshopCategory[]>([]);
  const [, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { request: requestHealth } = useApiRequest();
  const { request: requestStore } = useApiRequest<{ data: StoreInfo }>();
  const { request: requestCategories } = useApiRequest<{ data: NuvemshopCategory[] }>();
  const { request: requestProducts } = useApiRequest<{ data: NuvemshopProduct[] }>();

  const loadData = useCallback(async () => {
    setIsLoadingProducts(true);
    // Verificar saúde do sistema
    await requestHealth('/api/health');
    
    // Buscar informações da loja
    const storeResponse = await requestStore('/api/store');
    if (storeResponse.success && storeResponse.data?.data) {
      setStoreInfo(storeResponse.data.data);
    }
    
    // Buscar categorias primeiro
    const categoriesResponse = await requestCategories('/api/categories');
    if (categoriesResponse.success && categoriesResponse.data?.data) {
      setCategories(categoriesResponse.data.data);
    }
    
    // Buscar produtos
    const productsResponse = await requestProducts('/api/products?per_page=12');
    if (productsResponse.success && productsResponse.data?.data) {
      setProducts(productsResponse.data.data);
    }
    
    setIsLoadingProducts(false);
  }, [requestHealth, requestStore, requestCategories, requestProducts]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Removido o loading screen para mostrar skeleton direto na grid

  return (
    <PageContainer className="min-h-screen p-8">
      <div className="container mx-auto">
        <ContentSection className="mb-8">
          <Subtitle className="text-2xl font-semibold mb-6">Produtos em Destaque</Subtitle>
          
          <ProductGrid 
            products={products}
            categories={categories}
            isLoading={isLoadingProducts}
          />
        </ContentSection>
      </div>
    </PageContainer>
  );
}