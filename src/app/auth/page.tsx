'use client';

import { useSearchParams } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { useResendVerification } from '@/hooks/useResendVerification';
import { PatternFormat } from 'react-number-format';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { Tabs, TabPanelComponent } from '@/components/molecules/Tabs';
import {
  Container,
  FormContainer,
  FormTitle,
  Form,
  FormField
} from './styles';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/conta';
  
  const {
    tab,
    loading,
    error,
    success,
    loginData,
    registerData,
    handleTabChange,
    handleLogin,
    handleRegister,
    updateLoginData,
    updateRegisterData,
  } = useAuthForm(redirectTo);

  const { 
    loading: recoveryLoading, 
    error: recoveryError,
    requestPasswordReset 
  } = usePasswordRecovery();

  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  
  const {
    loading: resendLoading,
    success: resendSuccess,
    error: resendError,
    resendEmail: resendVerificationEmail
  } = useResendVerification();

  const [showResendEmail, setShowResendEmail] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔑 [Frontend] Solicitando recuperação de senha para:', recoveryEmail);
    const success = await requestPasswordReset(recoveryEmail);
    console.log('🔑 [Frontend] Resultado da solicitação:', success);
    if (success) {
      setRecoverySuccess(true);
      setRecoveryEmail('');
      toast.success('Email de recuperação enviado!');
    }
  };

  const handleResendVerification = async () => {
    if (!resendEmail.trim()) {
      toast.error('Digite seu email');
      return;
    }
    await resendVerificationEmail(resendEmail);
  };

  const tabs = [
    { label: 'Login', value: 0 as number },
    { label: 'Cadastro', value: 1 as number },
    { label: 'Recuperar Senha', value: 2 as number }
  ];

  return (
    <Container className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <FormContainer className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <FormTitle className="text-2xl font-bold text-center text-gray-900 mb-6">
          Área do Cliente
        </FormTitle>

        <Tabs 
          tabs={tabs}
          value={tab}
          onChange={(event, value) => handleTabChange(event, value as number)}
        >
          {error && (
            <Alert severity="error" className="my-4">
              {error}
              {error.includes('Email não verificado') && !showResendEmail && (
                <Button 
                  variant="text"
                  color="primary"
                  onClick={() => {
                    setShowResendEmail(true);
                    setResendEmail(loginData.email);
                  }}
                  className="mt-2 text-sm"
                >
                  Reenviar email de verificação
                </Button>
              )}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="my-4">
              {success}
            </Alert>
          )}

          {resendSuccess && (
            <Alert severity="success" className="my-4">
              {resendSuccess}
            </Alert>
          )}

          {resendError && (
            <Alert severity="error" className="my-4">
              {resendError}
            </Alert>
          )}

          {/* Login Tab */}
          <TabPanelComponent value={tab} index={0}>
            <Form onSubmit={handleLogin} className="space-y-4 mt-6">
              <FormField>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={loginData.email}
                  onChange={(e) => updateLoginData('email', e.target.value)}
                />
              </FormField>

              <FormField>
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  required
                  value={loginData.password}
                  onChange={(e) => updateLoginData('password', e.target.value)}
                />
              </FormField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
              >
                Entrar
              </Button>
            </Form>
          </TabPanelComponent>

          {/* Register Tab */}
          <TabPanelComponent value={tab} index={1}>
            <Form onSubmit={handleRegister} className="space-y-4 mt-6">
              <FormField>
                <TextField
                  label="Nome completo"
                  fullWidth
                  required
                  value={registerData.name}
                  onChange={(e) => updateRegisterData('name', e.target.value)}
                />
              </FormField>

              <FormField>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={registerData.email}
                  onChange={(e) => updateRegisterData('email', e.target.value)}
                />
              </FormField>

              <FormField>
                <PatternFormat
                  format="(##) #####-####"
                  mask="_"
                  customInput={TextField}
                  label="Telefone"
                  fullWidth
                  required
                  value={registerData.phone}
                  onValueChange={(values) => updateRegisterData('phone', values.value)}
                />
              </FormField>

              <FormField>
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  required
                  value={registerData.password}
                  onChange={(e) => updateRegisterData('password', e.target.value)}
                  helperText="Mínimo 8 caracteres"
                />
              </FormField>

              <FormField>
                <TextField
                  label="Confirmar senha"
                  type="password"
                  fullWidth
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => updateRegisterData('confirmPassword', e.target.value)}
                />
              </FormField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>
          </TabPanelComponent>

          {/* Password Recovery Tab */}
          <TabPanelComponent value={tab} index={2}>
            <Form onSubmit={handleRecoverySubmit} className="space-y-4 mt-6">
              {recoverySuccess ? (
                <Alert severity="success">
                  Email de recuperação enviado! Verifique sua caixa de entrada.
                </Alert>
              ) : (
                <>
                  <p className="text-gray-600 text-sm mb-4">
                    Digite seu email cadastrado para receber as instruções de recuperação de senha.
                  </p>

                  <FormField>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </FormField>

                  {recoveryError && (
                    <Alert severity="error">
                      {recoveryError}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={recoveryLoading}
                  >
                    Enviar email de recuperação
                  </Button>
                </>
              )}
            </Form>
          </TabPanelComponent>
        </Tabs>

        {/* Resend Verification Email */}
        {showResendEmail && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-3">
              Digite seu email para reenviar a verificação:
            </p>
            <FormField className="mb-3">
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
              />
            </FormField>
            <div className="flex gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleResendVerification}
                loading={resendLoading}
              >
                Reenviar
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setShowResendEmail(false);
                  setResendEmail('');
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </FormContainer>
    </Container>
  );
}