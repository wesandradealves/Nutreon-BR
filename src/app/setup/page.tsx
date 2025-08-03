'use client';

import { useState } from 'react';
import { Container } from './styles';

export default function SetupPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testToken = async () => {
    setLoading(true);
    setTestResult('Testando...');
    
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      
      if (data.success) {
        setTestResult(`✅ Token válido! Loja: ${data.data.name?.pt || data.data.name}`);
      } else {
        setTestResult(`❌ Token inválido: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Erro ao testar: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Configuração do Token Nuvemshop</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status Atual</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Token no .env:</strong> {process.env.NUVEMSHOP_ACCESS_TOKEN ? '✅ Configurado' : '❌ Não configurado'}</p>
            <p><strong>Store ID:</strong> {process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID || 'N/A'}</p>
            <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_NUVEMSHOP_API_URL || 'N/A'}</p>
          </div>
          
          <button
            onClick={testToken}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Testar Token Atual
          </button>
          
          {testResult && (
            <div className={`mt-4 p-3 rounded ${testResult.includes('✅') ? 'bg-green-100' : 'bg-red-100'}`}>
              {testResult}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Como Gerar um Novo Token</h2>
          
          <ol className="space-y-4 list-decimal list-inside">
            <li>
              <strong>Acesse sua loja Nuvemshop</strong>
              <br />
              <a href="https://www.nuvemshop.com.br/admin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Ir para o Admin da Nuvemshop →
              </a>
            </li>
            
            <li>
              <strong>Vá para Configurações → API</strong>
              <br />
              <span className="text-gray-600">Ou acesse diretamente: </span>
              <a href="https://www.nuvemshop.com.br/admin/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Configurações de API →
              </a>
            </li>
            
            <li>
              <strong>Crie um novo Token de Acesso Privado</strong>
              <br />
              <span className="text-gray-600">Clique em &quot;Criar token&quot; e dê um nome como &quot;Nutreon Development&quot;</span>
            </li>
            
            <li>
              <strong>Copie o token gerado</strong>
              <br />
              <span className="text-red-600">⚠️ Importante: O token só é mostrado uma vez!</span>
            </li>
            
            <li>
              <strong>Atualize o arquivo .env.local</strong>
              <br />
              <code className="bg-gray-100 p-2 rounded block mt-2">
                NUVEMSHOP_ACCESS_TOKEN=seu_novo_token_aqui
              </code>
            </li>
            
            <li>
              <strong>Reinicie o servidor Next.js</strong>
              <br />
              <code className="bg-gray-100 p-2 rounded block mt-2">
                Ctrl+C e npm run dev
              </code>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm">
              <strong>💡 Dica:</strong> Se você não tem acesso ao admin da loja, peça ao proprietário para gerar um token de API para você.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}