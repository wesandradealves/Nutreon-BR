'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import { useMetadata } from '@/hooks/useMetadata';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { 
  VerifyCard,
  CardContent,
  IconWrapper, 
  LoadingSpinner,
  SuccessIcon,
  ErrorIcon,
  Title, 
  Message, 
  ButtonGroup,
  InfoSection,
  InfoWrapper,
  InfoTitle,
  InfoText,
  StepsList,
  StepItem,
  StepIcon,
  StepText,
  StepStrong
} from './styles';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { request } = useApiRequest();
  const token = searchParams?.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  
  useMetadata({
    title: 'Verificar E-mail - Nutreon BR',
    description: 'Verifique seu e-mail para ativar sua conta Nutreon',
    ogTitle: 'Verificar E-mail - Nutreon BR'
  });

  useEffect(() => {
    if (!token) {
      router.push('/login');
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
  
  const handleGoToLogin = useCallback(() => {
    router.push('/login');
  }, [router]);
  
  const handleCreateAccount = useCallback(() => {
    router.push('/cadastro');
  }, [router]);


  return (
    <>
      {/* Verify Card */}
      <VerifyCard className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
          <CardContent>
            {status === 'loading' && (
              <>
                <IconWrapper className="flex justify-center mb-6">
                  <LoadingSpinner className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </IconWrapper>
                <Title className="text-3xl font-bold text-gray-900 mb-3">
                  Verificando seu email...
                </Title>
                <Message className="text-gray-600 text-lg">
                  Por favor, aguarde enquanto confirmamos seu email.
                </Message>
              </>
            )}

            {status === 'success' && (
              <>
                <IconWrapper className="flex justify-center mb-6">
                  <SuccessIcon className="fa fa-check-circle text-7xl text-green-500" />
                </IconWrapper>
                <Title className="text-3xl text-center font-bold text-gray-900 mb-4">
                  Email Verificado!
                </Title>
                <Alert severity="success" className="mb-8">
                  {message}
                </Alert>
                <Button
                  variant="contained"
                  onClick={handleGoToLogin}
                  fullWidth
                  className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
                >
                  Ir para Login
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <IconWrapper className="flex justify-center mb-6">
                  <ErrorIcon className="fa fa-times-circle text-7xl text-red-500" />
                </IconWrapper>
                <Title className="text-3xl font-bold text-gray-900 mb-4">
                  {message === 'Email já verificado' 
                    ? 'Email Já Verificado' 
                    : 'Erro na Verificação'
                  }
                </Title>
                <Alert severity="error" className="mb-8">
                  {message === 'Token inválido ou expirado'
                    ? 'Este link de verificação expirou ou é inválido. Por favor, faça login e solicite um novo email de verificação.'
                    : message === 'Email já verificado'
                    ? 'Este email já foi verificado anteriormente. Você pode fazer login normalmente.'
                    : message
                  }
                </Alert>
                <ButtonGroup className="space-y-3">
                  <Button
                    variant="contained"
                    onClick={handleGoToLogin}
                    fullWidth
                    className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
                  >
                    Ir para Login
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCreateAccount}
                    fullWidth
                    className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-[0_4px_0_0_#e5e5e5] hover:shadow-[0_2px_0_0_#e5e5e5] active:shadow-none active:translate-y-[2px] transition-all"
                  >
                    Criar Nova Conta
                  </Button>
                </ButtonGroup>
              </>
            )}
          </CardContent>
        </VerifyCard>
        
        {/* Info Section */}
        <InfoSection className="hidden xl:flex flex-col justify-center p-8">
          <InfoWrapper className="mb-8">
            <InfoTitle className="text-4xl font-bold text-white mb-4">
              Verificação de E-mail
            </InfoTitle>
            <InfoText className="text-gray-100 text-lg mb-8">
              A verificação do e-mail é importante para:
            </InfoText>
          </InfoWrapper>
          
          <StepsList className="space-y-6">
            <StepItem className="flex items-start">
              <StepIcon className="fa fa-shield-alt text-white text-xl mr-4 mt-0.5" />
              <StepText className="text-gray-100">
                <StepStrong className="text-white">Segurança da conta</StepStrong>: Confirmar que o e-mail é válido e pertence a você
              </StepText>
            </StepItem>
            
            <StepItem className="flex items-start">
              <StepIcon className="fa fa-bell text-white text-xl mr-4 mt-0.5" />
              <StepText className="text-gray-100">
                <StepStrong className="text-white">Comunicação importante</StepStrong>: Receber atualizações sobre seus pedidos e ofertas exclusivas
              </StepText>
            </StepItem>
            
            <StepItem className="flex items-start">
              <StepIcon className="fa fa-key text-white text-xl mr-4 mt-0.5" />
              <StepText className="text-gray-100">
                <StepStrong className="text-white">Recuperação de senha</StepStrong>: Garantir que você possa recuperar o acesso à sua conta
              </StepText>
            </StepItem>
            
            <StepItem className="flex items-start">
              <StepIcon className="fa fa-heart text-white text-xl mr-4 mt-0.5" />
              <StepText className="text-gray-100">
                <StepStrong className="text-white">Benefícios exclusivos</StepStrong>: Participar de promoções e programas de fidelidade
              </StepText>
            </StepItem>
          </StepsList>
        </InfoSection>
    </>
  );
}