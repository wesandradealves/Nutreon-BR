'use client';

import { useEffect, useState } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  PageContainer,
  LoadingContainer,
  ContentSection,
  Title,
  Subtitle,
  Text
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
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const { request, loading } = useApiRequest();

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    // Verificar saúde do sistema
    await request('/api/health');
    
    // Buscar informações da loja
    const storeResponse = await request<{ data: StoreInfo }>('/api/store');
    if (storeResponse.success && storeResponse.data?.data) {
      setStoreInfo(storeResponse.data.data);
    }
    
    // Buscar categorias primeiro
    const categoriesResponse = await request<{ data: NuvemshopCategory[] }>('/api/categories');
    if (categoriesResponse.success && categoriesResponse.data?.data) {
      setCategories(categoriesResponse.data.data);
    }
    
    // Buscar produtos
    const productsResponse = await request<{ data: NuvemshopProduct[] }>('/api/products?per_page=12');
    if (productsResponse.success && productsResponse.data?.data) {
      setProducts(productsResponse.data.data);
    }
  };

  if (loading) {
    return (
      <LoadingContainer className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <Text className="mt-4 text-gray-600">Carregando loja...</Text>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <ContentSection className="text-center mb-12">
          <Title className="text-4xl font-bold mb-4">
            {storeInfo?.name?.pt || 'Nutreon E-commerce'}
          </Title>
          <Text className="text-gray-600">
            Bem-vindo à nossa loja! Confira nossos produtos abaixo.
          </Text>
        </ContentSection>
        
        <ContentSection className="mb-8">
          <Subtitle className="text-2xl font-semibold mb-6">Produtos em Destaque</Subtitle>
          
          <ProductGrid 
            products={products}
            categories={categories}
          />
        </ContentSection>
      </div>
    </PageContainer>
  );
}