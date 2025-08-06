'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { useMetadata } from '@/hooks/useMetadata';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import {
  RecoveryCard,
  RecoveryForm,
  FormHeader,
  BackButton,
  BackIcon,
  FormTitle,
  FormSubtitle,
  FormContent,
  FormActions,
  SuccessMessage,
  SuccessIcon,
  SuccessTitle,
  SuccessText,
  InfoSection,
  InfoWrapper,
  InfoTitle,
  InfoText,
  StepsList,
  StepItem,
  StepNumber,
  StepText,
  SecurityNote,
  SecurityIcon,
  SecurityText,
  FieldWrapper,
  EmailHighlight,
  SecurityContent,
  SecurityTitle
} from './styles';

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [successSent, setSuccessSent] = useState(false);
  
  useMetadata({
    title: 'Recuperar Senha - Nutreon BR',
    description: 'Recupere sua senha da conta Nutreon',
    ogTitle: 'Recuperar Senha - Nutreon BR'
  });

  const { 
    loading, 
    error,
    requestPasswordReset 
  } = usePasswordRecovery();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await requestPasswordReset(email);
    if (success) {
      setSuccessSent(true);
    }
  }, [email, requestPasswordReset]);

  const handleBack = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <>
        {/* Recovery Form */}
        <RecoveryCard className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
          <FormHeader className="mb-8">
            <BackButton 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              type="button"
            >
              <BackIcon className="fa fa-arrow-left mr-2" />
              Voltar ao login
            </BackButton>
            
            <FormTitle className="text-4xl font-bold text-gray-900 mb-3">
              Recuperar senha
            </FormTitle>
            <FormSubtitle className="text-gray-600 text-lg">
              Esqueceu sua senha? Nós te ajudamos!
            </FormSubtitle>
          </FormHeader>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          {!successSent ? (
            <RecoveryForm onSubmit={handleSubmit}>
              <FormContent className="space-y-6">
                <FieldWrapper>
                  <TextField
                    label="E-mail cadastrado"
                    type="email"
                    placeholder="seu@email.com"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Digite o e-mail usado no cadastro da sua conta"
                  />
                </FieldWrapper>
              </FormContent>

              <FormActions className="mt-8 space-y-4">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
                >
                  Enviar e-mail de recuperação
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={handleBack}
                  className="py-3"
                >
                  Cancelar
                </Button>
              </FormActions>
            </RecoveryForm>
          ) : (
            <SuccessMessage className="text-center py-8">
              <SuccessIcon className="fa fa-check-circle text-6xl text-primary-500 mb-6" />
              <SuccessTitle className="text-2xl font-bold text-gray-900 mb-4">
                E-mail enviado com sucesso!
              </SuccessTitle>
              <SuccessText className="text-gray-600 mb-8">
                Enviamos as instruções de recuperação para <EmailHighlight>{email}</EmailHighlight>
              </SuccessText>
              
              <Button
                fullWidth
                variant="contained"
                onClick={handleBack}
                className="py-3 bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all"
              >
                Voltar ao login
              </Button>
            </SuccessMessage>
          )}
        </RecoveryCard>

        {/* Info Section */}
        <InfoSection className="hidden xl:flex flex-col justify-center p-8">
          <InfoWrapper className="mb-8">
            <InfoTitle className="text-3xl font-bold text-white mb-4">
              Como funciona?
            </InfoTitle>
            <InfoText className="text-gray-100 text-lg mb-8">
              Siga os passos abaixo para recuperar o acesso à sua conta:
            </InfoText>
          </InfoWrapper>
          
          <StepsList className="space-y-6 mb-12">
            <StepItem className="flex items-start">
              <StepNumber className="flex-shrink-0 w-10 h-10 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                1
              </StepNumber>
              <StepText className="text-gray-100 pt-2">
                Digite o e-mail cadastrado em sua conta Nutreon
              </StepText>
            </StepItem>

            <StepItem className="flex items-start">
              <StepNumber className="flex-shrink-0 w-10 h-10 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                2
              </StepNumber>
              <StepText className="text-gray-100 pt-2">
                Acesse sua caixa de entrada e procure pelo nosso e-mail
              </StepText>
            </StepItem>

            <StepItem className="flex items-start">
              <StepNumber className="flex-shrink-0 w-10 h-10 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                3
              </StepNumber>
              <StepText className="text-gray-100 pt-2">
                Clique no link de recuperação (válido por 1 hora)
              </StepText>
            </StepItem>

            <StepItem className="flex items-start">
              <StepNumber className="flex-shrink-0 w-10 h-10 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                4
              </StepNumber>
              <StepText className="text-gray-100 pt-2">
                Crie uma nova senha segura para sua conta
              </StepText>
            </StepItem>
          </StepsList>

          <SecurityNote className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-start">
            <SecurityIcon className="fa fa-shield-alt text-white text-xl mr-3 mt-0.5" />
            <SecurityContent>
              <SecurityTitle className="font-semibold text-white mb-2">Dica de segurança</SecurityTitle>
              <SecurityText className="text-gray-100 text-sm">
                Por segurança, não compartilhe o link de recuperação com ninguém. 
                Se você não solicitou a recuperação de senha, ignore o e-mail.
              </SecurityText>
            </SecurityContent>
          </SecurityNote>
        </InfoSection>
    </>
  );
}