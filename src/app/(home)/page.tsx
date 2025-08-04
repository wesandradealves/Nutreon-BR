'use client';

import { useEffect, useState } from 'react';
import { useBFF } from '@/hooks/useBFF';
import Image from 'next/image';
import {
  PageContainer,
  LoadingContainer,
  ContentSection,
  Title,
  Subtitle,
  Text,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  Button
} from './styles';

interface Product {
  id: number;
  name: { pt?: string; [key: string]: string | undefined };
  images: Array<{ src: string }>;
  variants: Array<{ price: string }>;
}

interface StoreInfo {
  name: { pt?: string; [key: string]: string | undefined };
  email: string;
  country: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const { request, loading } = useBFF();

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    console.log('🏠 [HomePage] Carregando dados...');
    
    // Verificar saúde do sistema
    const health = await request('/health');
    console.log('🏥 [HomePage] Status do sistema:', health?.data);
    
    // Buscar informações da loja
    const storeResponse = await request<StoreInfo>('/store');
    if (storeResponse?.data) {
      setStoreInfo(storeResponse.data);
    }
    
    // Buscar produtos
    const productsResponse = await request<Product[]>('/products?per_page=8');
    if (productsResponse?.data) {
      setProducts(productsResponse.data);
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
          
          {products.length > 0 ? (
            <ProductGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {product.images?.[0] && (
                    <ProductImage className="aspect-square bg-gray-100">
                      <Image 
                        src={product.images[0].src} 
                        alt={product.name.pt || 'Produto'}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </ProductImage>
                  )}
                  <div className="p-4">
                    <ProductTitle className="font-medium text-lg mb-2">
                      {product.name.pt || 'Produto sem nome'}
                    </ProductTitle>
                    {product.variants?.[0] && (
                      <ProductPrice className="text-primary-500 font-bold text-xl">
                        R$ {product.variants[0].price}
                      </ProductPrice>
                    )}
                    <Button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
                      Ver Detalhes
                    </Button>
                  </div>
                </ProductCard>
              ))}
            </ProductGrid>
          ) : (
            <ContentSection className="text-center py-12 bg-gray-50 rounded-lg">
              <Text className="text-gray-500">Nenhum produto disponível no momento.</Text>
            </ContentSection>
          )}
        </ContentSection>
        
        <ContentSection className="mt-12 text-center">
          <Button 
            onClick={loadData}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Recarregar Dados
          </Button>
        </ContentSection>
      </div>
    </PageContainer>
  );
}