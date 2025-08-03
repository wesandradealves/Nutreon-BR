import Link from 'next/link';
import { Container } from './styles';

export default function UnauthorizedPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Não Autorizado</h1>
        <p className="text-gray-600 mb-6">
          Para acessar esta área, você precisa instalar o aplicativo Nutreon em sua loja Nuvemshop.
        </p>
        <div className="space-y-4">
          <Link 
            href="https://www.nuvemshop.com.br/loja-aplicativos-nuvem"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir para Loja de Aplicativos
          </Link>
          <Link 
            href="/"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </Container>
  );
}