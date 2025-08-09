'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Title = styled.h1``;
const Button = styled.button``;
const Code = styled.pre``;
const Info = styled.div``;
const Step = styled.div``;

export default function OAuthTempPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const clientId = process.env.NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_NUVEMSHOP_REDIRECT_URI;
  
  // URL para iniciar OAuth com state parameter
  const authUrl = `https://www.tiendanube.com/apps/${clientId}/authorize?state=oauth_temp`;

  const handleStartOAuth = () => {
    // Salvar estado para verificar depois
    localStorage.setItem('oauth_temp', 'true');
    
    // Redirecionar para autorização
    window.location.href = authUrl;
  };

  // Verificar se voltamos do OAuth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const userId = urlParams.get('user_id');
      
      if (accessToken && userId) {
        setToken(accessToken);
        localStorage.removeItem('oauth_temp');
      }
      
      const errorParam = urlParams.get('error');
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, []);

  return (
    <Container className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <Title className="text-3xl font-bold mb-6 text-gray-800">
          🔐 Obter Token OAuth Nuvemshop (Temporário)
        </Title>
        
        <Info className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700">
            Esta página é temporária apenas para obter o token de acesso.
            Após obter o token, copie-o para o arquivo .env e delete esta página.
          </p>
        </Info>

        <Step className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Passo 1: Configurações Atuais</h2>
          <Code className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`CLIENT_ID: ${clientId || 'NÃO CONFIGURADO'}
REDIRECT_URI: ${redirectUri || 'NÃO CONFIGURADO'}
STORE_ID: ${process.env.NEXT_PUBLIC_NUVEMSHOP_STORE_ID || 'NÃO CONFIGURADO'}`}
          </Code>
        </Step>

        <Step className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Passo 2: Autorizar Aplicação</h2>
          <Button 
            onClick={handleStartOAuth}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🚀 Iniciar Autorização OAuth
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Você será redirecionado para a Nuvemshop para autorizar a aplicação.
          </p>
        </Step>

        {token && (
          <Step className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              ✅ Token Obtido com Sucesso!
            </h2>
            <p className="mb-2">Copie este token e adicione no arquivo .env:</p>
            <Code className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto break-all">
{`NUVEMSHOP_ACCESS_TOKEN=${token}`}
            </Code>
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="text-yellow-700 font-semibold">⚠️ Importante:</p>
              <ol className="list-decimal list-inside text-yellow-700 text-sm mt-2">
                <li>Copie o token acima</li>
                <li>Cole no arquivo .env substituindo &quot;temp_access_token_será_gerado&quot;</li>
                <li>Reinicie o servidor (npm run dev)</li>
                <li>Delete a pasta src/app/oauth-temp</li>
              </ol>
            </div>
          </Step>
        )}

        {error && (
          <Step className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              ❌ Erro na Autorização
            </h2>
            <Code className="bg-red-50 text-red-700 p-4 rounded">
              {error}
            </Code>
          </Step>
        )}

        <Step className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Passo 3: Processo Manual (Alternativa)</h2>
          <div className="space-y-2 text-gray-700">
            <p>Se o fluxo automático não funcionar, você pode obter o token manualmente:</p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Acesse: https://partners.nuvemshop.com.br</li>
              <li>Vá em &quot;Minhas Aplicações&quot;</li>
              <li>Clique na aplicação &quot;Nutreon&quot; (ID: 20076)</li>
              <li>Instale na loja de teste</li>
              <li>Gere um token de acesso permanente</li>
            </ol>
          </div>
        </Step>
      </div>
    </Container>
  );
}