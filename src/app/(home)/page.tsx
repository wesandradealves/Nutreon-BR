'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Container } from './styles';

export default function HomePage() {
  const { isAuthenticated, isLoading, storeData } = useAuth();

  if (isLoading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Nutreon E-commerce</h1>
        
        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo!</h2>
            <div className="space-y-2">
              <p><strong>Loja:</strong> {storeData?.name?.pt}</p>
              <p><strong>Email:</strong> {storeData?.email}</p>
              <p><strong>Domínio:</strong> {storeData?.original_domain}</p>
              <p><strong>Plano:</strong> {storeData?.plan_name}</p>
            </div>
            <div className="mt-6 space-y-4">
              <Link 
                href="/produtos"
                className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gerenciar Produtos
              </Link>
              <Link 
                href="/pedidos"
                className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Pedidos
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Aplicação não autorizada</h2>
            <p className="text-gray-600 mb-6">
              Para usar esta aplicação, você precisa instalar o app Nutreon em sua loja Nuvemshop.
            </p>
            <Link 
              href="/unauthorized"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Saiba mais
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}