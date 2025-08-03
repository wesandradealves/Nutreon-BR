'use client';

import { useEffect } from 'react';
import { Container } from './styles';
import Link from 'next/link';

export default function LoginPage() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID || '';
    
    // Gerar um state aleatório para CSRF protection
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('oauth_state', state);
    
    // URL correta de autorização conforme documentação
    const authUrl = `https://www.tiendanube.com/apps/${clientId}/authorize?state=${state}`;
    
    console.log('Redirecting to:', authUrl);
    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error) {
      console.error('Erro de autenticação:', error);
    }
  }, []);

  return (
    <Container className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nutreon E-commerce</h1>
          <p className="text-gray-600">Conecte sua loja Nuvemshop para começar</p>
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          Conectar com Nuvemshop
        </button>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Ao conectar, você autoriza o Nutreon a:</p>
          <ul className="mt-2 space-y-1 text-left">
            <li>• Acessar seus produtos</li>
            <li>• Gerenciar pedidos</li>
            <li>• Sincronizar estoque</li>
          </ul>
        </div>
        
        <Link 
          href="/"
          className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          Voltar ao início
        </Link>
      </div>
    </Container>
  );
}