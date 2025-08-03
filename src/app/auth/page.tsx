'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from './styles';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Verificar parâmetros de retorno
    const authSuccess = searchParams?.get('auth_success');
    const authError = searchParams?.get('auth_error');

    if (authSuccess) {
      setStatus('success');
      setMessage('Autenticação realizada com sucesso!');
      // Redirecionar após 2 segundos
      setTimeout(() => router.push('/'), 2000);
    } else if (authError) {
      setStatus('error');
      setMessage(`Erro na autenticação: ${authError}`);
    }
  }, [searchParams, router]);

  const handleAuth = () => {
    const authUrl = `https://www.tiendanube.com/apps/${process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID}/authorize?` +
      `client_id=${process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_NUVEMSHOP_REDIRECT_URI!)}`;
    
    window.location.href = authUrl;
  };

  return (
    <Container className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Conectar com Nuvemshop</h1>
        
        {status === 'idle' && (
          <>
            <p className="text-gray-600 text-center mb-6">
              Clique no botão abaixo para autorizar a aplicação a acessar sua loja Nuvemshop.
            </p>
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Conectar com Nuvemshop
            </button>
          </>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600">{message}</p>
            <p className="text-gray-500 mt-2">Redirecionando...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-600">{message}</p>
            <button
              onClick={handleAuth}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}