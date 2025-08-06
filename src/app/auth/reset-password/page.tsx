'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useMetadata } from '@/hooks/useMetadata';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { IMAGES } from '@/utils/constants';
import { 
  Container, 
  BackgroundImage,
  BackgroundOverlay,
  ContentWrapper,
  ResetCard,
  CardContent,
  CardInner,
  Title,
  Form,
  PasswordStrengthWrapper,
  PasswordStrengthText,
  PasswordStrengthBarContainer,
  PasswordStrengthBar,
  InfoSection,
  InfoWrapper,
  InfoTitle,
  InfoText,
  SecurityList,
  SecurityItem,
  SecurityIcon,
  SecurityText,
  SuccessCard,
  SuccessMessage
} from './styles';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  
  useMetadata({
    title: 'Redefinir Senha - Nutreon BR',
    description: 'Defina uma nova senha para sua conta Nutreon',
    ogTitle: 'Redefinir Senha - Nutreon BR'
  });
  
  const { loading, resetPassword } = usePasswordRecovery();
  const { 
    password, 
    confirmPassword, 
    passwordStrength,
    passwordError,
    setPassword,
    setConfirmPassword,
    validatePasswords
  } = usePasswordValidation();
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Token de recuperação não encontrado');
    }
  }, [token]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePasswords()) {
      return;
    }

    if (!token) {
      setError('Token de recuperação inválido');
      return;
    }

    const success = await resetPassword(token, password);
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [validatePasswords, token, resetPassword, password, router]);

  const getPasswordStrengthColor = useMemo(() => {
    if (passwordStrength.score <= 1) return 'bg-red-500';
    if (passwordStrength.score <= 2) return 'bg-yellow-500';
    if (passwordStrength.score <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  }, [passwordStrength.score]);

  const getPasswordStrengthValue = useMemo(() => {
    return (passwordStrength.score / 4) * 100;
  }, [passwordStrength.score]);

  if (success) {
    return (
      <Container className="min-h-screen relative">
        <BackgroundImage 
          $backgroundImage={IMAGES.AUTH_BACKGROUND}
          className="absolute inset-0 w-full h-full"
        />
        <BackgroundOverlay className="absolute inset-0 bg-primary-500 opacity-90 mix-blend-multiply" />
        <ContentWrapper className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <SuccessCard className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 lg:p-10 text-center">
            <Alert severity="success" className="mb-4">
              Senha redefinida com sucesso!
            </Alert>
            <SuccessMessage className="text-gray-700">
              Você será redirecionado para a página de login...
            </SuccessMessage>
          </SuccessCard>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen relative">
      <BackgroundImage 
        $backgroundImage={IMAGES.AUTH_BACKGROUND}
        className="absolute inset-0 w-full h-full"
      />
      <BackgroundOverlay className="absolute inset-0 bg-primary-500 opacity-90 mix-blend-multiply" />
      
      <ContentWrapper className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-8  items-center">
        <ResetCard className="flex items-center justify-center lg:justify-end py-8">
          <CardContent className="w-full max-w-md bg-white rounded-2xl shadow-xl">
            <CardInner className="p-8 lg:p-10">
              <Title className="text-3xl font-bold text-center text-gray-900 mb-6">
                Redefinir Senha
              </Title>
              
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}

              {!token ? (
                <Alert severity="error">
                  Link de recuperação inválido. Por favor, solicite um novo email de recuperação.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    label="Nova Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    error={!!passwordError}
                    helperText={passwordError}
                    className="mb-4"
                  />
                  
                  {password && (
                    <PasswordStrengthWrapper className="mb-4">
                      <PasswordStrengthText className="text-sm text-gray-600">
                        Força da senha: {passwordStrength.feedback}
                      </PasswordStrengthText>
                      <PasswordStrengthBarContainer className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <PasswordStrengthBar 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor}`}
                          style={{ width: `${getPasswordStrengthValue}%` }}
                        />
                      </PasswordStrengthBarContainer>
                    </PasswordStrengthWrapper>
                  )}

                  <TextField
                    label="Confirmar Nova Senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    error={password !== confirmPassword && confirmPassword !== ''}
                    helperText={
                      password !== confirmPassword && confirmPassword !== ''
                        ? 'As senhas não coincidem'
                        : ''
                    }
                    className="mb-6"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading || !password || !confirmPassword || !!passwordError}
                    className="mb-3 py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
                  >
                    {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                  </Button>

                  <Button
                    variant="text"
                    fullWidth
                    onClick={() => router.push('/login')}
                    disabled={loading}
                    className="text-gray-600 hover:text-primary-500"
                  >
                    Voltar para Login
                  </Button>
                </Form>
              )}
            </CardInner>
          </CardContent>
        </ResetCard>

        <InfoSection className="hidden lg:flex items-center justify-start">
          <InfoWrapper className="max-w-md">
            <InfoTitle className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Segurança em Primeiro Lugar
            </InfoTitle>
            <InfoText className="text-gray-100 mb-6 text-lg">
              Defina uma senha forte para proteger sua conta. Siga nossas recomendações para máxima segurança.
            </InfoText>
            
            <SecurityList className="space-y-4">
              <SecurityItem className="flex items-start gap-3">
                <SecurityIcon className="fa fa-lock text-white text-xl mt-1 drop-shadow-lg" />
                <SecurityText className="text-gray-100">
                  Use pelo menos 8 caracteres com letras, números e símbolos
                </SecurityText>
              </SecurityItem>
              
              <SecurityItem className="flex items-start gap-3">
                <SecurityIcon className="fa fa-shield text-white text-xl mt-1 drop-shadow-lg" />
                <SecurityText className="text-gray-100">
                  Evite informações pessoais ou palavras comuns
                </SecurityText>
              </SecurityItem>
              
              <SecurityItem className="flex items-start gap-3">
                <SecurityIcon className="fa fa-key text-white text-xl mt-1 drop-shadow-lg" />
                <SecurityText className="text-gray-100">
                  Use uma senha única que você não use em outros sites
                </SecurityText>
              </SecurityItem>
              
              <SecurityItem className="flex items-start gap-3">
                <SecurityIcon className="fa fa-check-circle text-white text-xl mt-1 drop-shadow-lg" />
                <SecurityText className="text-gray-100">
                  Ative a autenticação de dois fatores quando disponível
                </SecurityText>
              </SecurityItem>
            </SecurityList>
          </InfoWrapper>
        </InfoSection>
      </ContentWrapper>
    </Container>
  );
}