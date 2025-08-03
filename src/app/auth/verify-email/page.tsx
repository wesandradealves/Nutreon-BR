'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useBFF } from '@/hooks/useBFF';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@mui/icons-material';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { request } = useBFF();
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
      try {
        const response = await request('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });

        if (response && response.success) {
          setStatus('success');
          setMessage('Email verificado com sucesso! Você será redirecionado para o login...');
          setTimeout(() => {
            router.push('/auth?tab=0');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Erro ao verificar email');
        }
      } catch {
        setStatus('error');
        setMessage('Token inválido ou expirado');
      }
    };

    verify();
  }, [token, request, router]);


  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3}>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          {status === 'loading' && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5" gutterBottom>
                Verificando seu email...
              </Typography>
              <Typography color="text.secondary">
                Por favor, aguarde enquanto confirmamos seu email.
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Email Verificado!
              </Typography>
              <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
                {message}
              </Alert>
              <Button
                variant="contained"
                onClick={() => router.push('/auth?tab=0')}
              >
                Ir para Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Erro na Verificação
              </Typography>
              <Alert severity="error" sx={{ mt: 2, mb: 3 }}>
                {message}
              </Alert>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
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
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}