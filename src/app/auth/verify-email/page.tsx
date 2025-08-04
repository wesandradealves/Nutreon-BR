'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { Container, Card, IconWrapper, Title, Message, ButtonGroup } from './styles';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { request } = useApiRequest();
  const token = searchParams?.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de verificação não encontrado');
      return;
    }

    const verify = async () => {
      const response = await request('/api/auth/verify-email', {
        method: 'POST',
        data: { token },
      });

      if (response.success) {
        setStatus('success');
        setMessage('Email verificado com sucesso! Você foi conectado automaticamente.');
        
        setTimeout(() => {
          router.push('/conta');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(response.error || 'Erro ao verificar email');
      }
    };

    verify();
  }, [token, request, router]);


  return (
    <Container className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <IconWrapper className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </IconWrapper>
              <Title className="text-2xl font-bold text-gray-800 mb-3">
                Verificando seu email...
              </Title>
              <Message className="text-gray-600">
                Por favor, aguarde enquanto confirmamos seu email.
              </Message>
            </>
          )}

          {status === 'success' && (
            <>
              <IconWrapper className="flex justify-center mb-4">
                <i className="fa fa-check-circle text-6xl text-green-500" />
              </IconWrapper>
              <Title className="text-2xl font-bold text-gray-800 mb-3">
                Email Verificado!
              </Title>
              <Alert severity="success" className="mb-6">
                {message}
              </Alert>
              <Button
                variant="contained"
                onClick={() => router.push('/auth?tab=0')}
                fullWidth
              >
                Ir para Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <IconWrapper className="flex justify-center mb-4">
                <i className="fa fa-times-circle text-6xl text-red-500" />
              </IconWrapper>
              <Title className="text-2xl font-bold text-gray-800 mb-3">
                Erro na Verificação
              </Title>
              <Alert severity="error" className="mb-6">
                {message}
              </Alert>
              <ButtonGroup className="flex gap-3 justify-center">
                <Button
                  variant="outlined"
                  onClick={() => router.push('/auth?tab=1')}
                >
                  Criar Nova Conta
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/auth?tab=0')}
                >
                  Ir para Login
                </Button>
              </ButtonGroup>
            </>
          )}
      </Card>
    </Container>
  );
}