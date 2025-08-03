'use client';

import { useEffect, useState } from 'react';
import { Container } from './styles';
import { useBFF } from '@/hooks/useBFF';
import Image from 'next/image';

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
    
    // Primeiro, verificar debug
    const debug = await request('/debug');
    console.log('🔍 [HomePage] Debug info:', debug?.data);
    
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
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando loja...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {storeInfo?.name?.pt || 'Nutreon E-commerce'}
          </h1>
          <p className="text-gray-600">
            Bem-vindo à nossa loja! Confira nossos produtos abaixo.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Produtos em Destaque</h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {product.images?.[0] && (
                    <div className="aspect-square bg-gray-100">
                      <Image 
                        src={product.images[0].src} 
                        alt={product.name.pt || 'Produto'}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">
                      {product.name.pt || 'Produto sem nome'}
                    </h3>
                    {product.variants?.[0] && (
                      <p className="text-green-600 font-bold text-xl">
                        R$ {product.variants[0].price}
                      </p>
                    )}
                    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Nenhum produto disponível no momento.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Recarregar Dados
          </button>
        </div>
      </div>
    </Container>
  );
}