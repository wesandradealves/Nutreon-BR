'use client';

import { useAuthForm } from '@/hooks/useAuthForm';
import { useMetadata } from '@/hooks/useMetadata';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Divider } from '@/components/atoms/Divider';
import { Alert } from '@/components/atoms/Alert';
import { IMAGES } from '@/utils/constants';
import {
  Container,
  BackgroundImage,
  BackgroundOverlay,
  ContentWrapper,
  RegisterCard,
  RegisterForm,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormContent,
  FormRow,
  FormActions,
  LoginPrompt,
  LoginPromptText,
  BenefitsSection,
  BenefitsWrapper,
  BenefitsTitle,
  BenefitsText,
  BenefitsList,
  BenefitItem,
  BenefitIcon,
  BenefitText
} from './styles';

export default function CadastroPage() {
  
  useMetadata({
    title: 'Cadastro - Nutreon BR',
    description: 'Crie sua conta Nutreon e comece sua jornada para uma vida mais saudável',
    ogTitle: 'Cadastro - Nutreon BR'
  });

  const {
    loading,
    error,
    success,
    registerData,
    handleRegister,
    updateRegisterData,
  } = useAuthForm();

  return (
    <Container className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Grayscale */}
      <BackgroundImage 
        className="absolute inset-0 w-full h-full"
        $backgroundImage={IMAGES.AUTH_BACKGROUND}
      />
      
      {/* Primary Color Overlay */}
      <BackgroundOverlay className="absolute inset-0 bg-primary-500 opacity-90 mix-blend-multiply" />
      
      {/* Content */}
      <ContentWrapper className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 sm:p-6 lg:p-8  items-center">
        {/* Benefits Section */}
        <BenefitsSection className="hidden xl:flex flex-col justify-center p-8 order-2 lg:order-1">
          <BenefitsWrapper className="mb-8">
            <BenefitsTitle className="text-4xl font-bold text-white mb-4">
              Bem-vindo à Nutreon!
            </BenefitsTitle>
            <BenefitsText className="text-gray-100 text-lg">
              Crie sua conta e aproveite todos os benefícios:
            </BenefitsText>
          </BenefitsWrapper>
          
          <BenefitsList className="space-y-4">
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Acesso a mais de 60 refeições congeladas nutritivas e saborosas
              </BenefitText>
            </BenefitItem>
            
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Kits personalizáveis &ldquo;Seja Chef&rdquo; para preparar em casa
              </BenefitText>
            </BenefitItem>
            
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Consultoria nutricional com profissionais especializados
              </BenefitText>
            </BenefitItem>
            
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Frete grátis em compras acima de R$ 200
              </BenefitText>
            </BenefitItem>
            
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Acompanhamento personalizado dos seus pedidos
              </BenefitText>
            </BenefitItem>
            
            <BenefitItem className="flex items-start">
              <BenefitIcon className="fa fa-check-circle text-white text-xl mt-0.5 mr-3" />
              <BenefitText className="text-gray-100">
                Ofertas exclusivas e descontos especiais
              </BenefitText>
            </BenefitItem>
          </BenefitsList>
        </BenefitsSection>

        {/* Register Form */}
        <RegisterCard className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 order-1 lg:order-2">
          <FormHeader className="mb-8 text-center">
            <FormTitle className="text-4xl font-bold text-gray-900 mb-3">
              Criar conta
            </FormTitle>
            <FormSubtitle className="text-gray-600 text-lg">
              Preencha os dados abaixo para começar
            </FormSubtitle>
          </FormHeader>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="mb-6">
              {success}
            </Alert>
          )}

          <RegisterForm onSubmit={handleRegister}>
            <FormContent className="space-y-5">
              <TextField
                label="Nome completo"
                type="text"
                placeholder="Seu nome completo"
                fullWidth
                required
                value={registerData.name}
                onChange={(e) => updateRegisterData('name', e.target.value)}
              />

              <TextField
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                fullWidth
                required
                value={registerData.email}
                onChange={(e) => updateRegisterData('email', e.target.value)}
              />

              <PatternFormat
                format="(##) #####-####"
                mask="_"
                customInput={TextField}
                label="Telefone"
                placeholder="(00) 00000-0000"
                fullWidth
                required
                value={registerData.phone}
                onValueChange={(values) => updateRegisterData('phone', values.value)}
              />

              <FormRow className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <TextField
                  label="Senha"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  fullWidth
                  required
                  value={registerData.password}
                  onChange={(e) => updateRegisterData('password', e.target.value)}
                  helperText="Use letras, números e símbolos"
                />

                <TextField
                  label="Confirmar senha"
                  type="password"
                  placeholder="Digite novamente"
                  fullWidth
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => updateRegisterData('confirmPassword', e.target.value)}
                />
              </FormRow>
            </FormContent>

            <FormActions className="mt-8 space-y-4">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
              >
                Criar conta
              </Button>
            </FormActions>
          </RegisterForm>

          <Divider text="ou" className="my-8" />
{/* 
          <SocialRegister className="space-y-4">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => window.location.href = '/api/auth/google'}
              className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-[0_4px_0_0_#e5e5e5] hover:shadow-[0_2px_0_0_#e5e5e5] active:shadow-none active:translate-y-[2px] transition-all"
            >
              <BenefitIcon className="fa-brands fa-google mr-2 text-red-500" />
              Google
            </Button>
          </SocialRegister> */}

          <LoginPrompt className="mt-8 text-center">
            <LoginPromptText className="text-gray-600">Já tem uma conta? </LoginPromptText>
            <Link href="/login" variant="primary" className="font-semibold">
              Fazer login
            </Link>
          </LoginPrompt>
        </RegisterCard>
      </ContentWrapper>
    </Container>
  );
}