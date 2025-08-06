'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useMetadata } from '@/hooks/useMetadata';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Link } from '@/components/atoms/Link';
import { Divider } from '@/components/atoms/Divider';
import { Alert } from '@/components/atoms/Alert';
import {
  LoginCard,
  LoginForm,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormContent,
  RememberForgotWrapper,
  FormActions,
  RegisterPrompt,
  RegisterPromptText,
  RegisterSection,
  BrandWrapper,
  RegisterTitle,
  BrandSlogan,
  RegisterText,
  FeatureList,
  FeatureItem,
  FeatureIconWrapper,
  FeatureIcon,
  FeatureContent,
  FeatureTitle,
  FeatureText
} from './styles';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/conta';
  const [rememberMe, setRememberMe] = useState(false);
  
  useMetadata({
    title: 'Login - Nutreon BR',
    description: 'Faça login em sua conta Nutreon',
    ogTitle: 'Login - Nutreon BR'
  });

  const {
    loading,
    error,
    loginData,
    handleLogin,
    updateLoginData,
  } = useAuthForm(redirectTo);

  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  return (
    <>
      {/* Login Form */}
      <LoginCard className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 order-2 lg:order-1">
          <FormHeader className="mb-10 text-center">
            <FormTitle className="text-4xl font-bold text-gray-900 mb-3">
              Bem-vindo de volta!
            </FormTitle>
            <FormSubtitle className="text-gray-600 text-lg">
              Faça login para acessar sua conta
            </FormSubtitle>
          </FormHeader>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          <LoginForm onSubmit={handleLogin}>
            <FormContent className="space-y-6">
              <TextField
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                fullWidth
                required
                value={loginData.email}
                onChange={(e) => updateLoginData('email', e.target.value)}
                className="text-lg"
              />

              <div>
                <TextField
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  fullWidth
                  required
                  value={loginData.password}
                  onChange={(e) => updateLoginData('password', e.target.value)}
                  className="text-lg"
                />
                <RememberForgotWrapper className="mt-3 flex items-center justify-between">
                  <Checkbox
                    label="Lembrar de mim"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <Link href="/recuperar-senha" variant="primary" className="text-sm font-medium">
                    Esqueceu sua senha?
                  </Link>
                </RememberForgotWrapper>
              </div>
            </FormContent>

            <FormActions className="mt-8 space-y-4">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
              >
                Entrar
              </Button>
            </FormActions>
          </LoginForm>

          <Divider text="ou" className="my-8" />

          {/* <SocialLogin className="space-y-4">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => window.location.href = '/api/auth/google'}
              className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-[0_4px_0_0_#e5e5e5] hover:shadow-[0_2px_0_0_#e5e5e5] active:shadow-none active:translate-y-[2px] transition-all"
            >
              <FeatureIcon className="fa-brands fa-google mr-2 text-red-500" />
              Google
            </Button>
          </SocialLogin> */}

          <RegisterPrompt className="mt-8 text-center">
            <RegisterPromptText className="text-gray-600">Não tem uma conta? </RegisterPromptText>
            <Link href="/cadastro" variant="primary" className="font-semibold">
              Cadastre-se
            </Link>
          </RegisterPrompt>
        </LoginCard>

        {/* Brand Section */}
        <RegisterSection className="hidden xl:flex flex-col justify-center p-8 order-1 lg:order-2">
          <BrandWrapper className="mb-8">
            <RegisterTitle className="text-5xl font-bold text-white mb-4">
              Nutreon
            </RegisterTitle>
            <BrandSlogan className="text-2xl text-white font-semibold mb-2">
              Nutrindo Saúde, Transformando Vidas
            </BrandSlogan>
            <RegisterText className="text-gray-100 text-lg">
              Sua jornada para uma vida mais saudável começa aqui
            </RegisterText>
          </BrandWrapper>
          
          <FeatureList className="space-y-6">
            <FeatureItem className="flex items-start">
              <FeatureIconWrapper className="flex-shrink-0 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <FeatureIcon className="fa fa-utensils text-white text-xl" />
              </FeatureIconWrapper>
              <FeatureContent>
                <FeatureTitle className="font-bold text-white mb-1 text-lg drop-shadow-md">Refeições Saudáveis</FeatureTitle>
                <FeatureText className="text-white/90 drop-shadow-sm">Mais de 60 opções de refeições congeladas nutritivas</FeatureText>
              </FeatureContent>
            </FeatureItem>

            <FeatureItem className="flex items-start">
              <FeatureIconWrapper className="flex-shrink-0 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <FeatureIcon className="fa fa-truck text-white text-xl" />
              </FeatureIconWrapper>
              <FeatureContent>
                <FeatureTitle className="font-bold text-white mb-1 text-lg drop-shadow-md">Entrega Rápida</FeatureTitle>
                <FeatureText className="text-white/90 drop-shadow-sm">Receba suas refeições congeladas com qualidade garantida</FeatureText>
              </FeatureContent>
            </FeatureItem>

            <FeatureItem className="flex items-start">
              <FeatureIconWrapper className="flex-shrink-0 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <FeatureIcon className="fa fa-heart text-white text-xl" />
              </FeatureIconWrapper>
              <FeatureContent>
                <FeatureTitle className="font-bold text-white mb-1 text-lg drop-shadow-md">Consultoria Nutricional</FeatureTitle>
                <FeatureText className="text-white/90 drop-shadow-sm">Acompanhamento personalizado para seus objetivos</FeatureText>
              </FeatureContent>
            </FeatureItem>
          </FeatureList>

          {/* <RegisterCTA className="mt-12">
            <RegisterCTAText className="text-white font-semibold mb-4 text-lg drop-shadow-md">Primeira vez aqui?</RegisterCTAText>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => router.push('/cadastro')}
              className="py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
            >
              Criar conta gratuita
            </Button>
          </RegisterCTA> */}
      </RegisterSection>
    </>
  );
}