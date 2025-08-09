'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import { usePhoneFormat } from '@/hooks/usePhoneFormat';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useResendVerification } from '@/hooks/useResendVerification';
import { useForm, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'react-hot-toast';
import { Pencil, Save, X, Lock, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Section,
  SectionHeader,
  SectionTitle,
  InfoRow,
  Label,
  Value,
  ButtonGroup,
  Divider,
  LoadingWrapper,
  LoadingSpinner,
  LoadingText,
  AlertWrapper,
  AlertText,
  Form,
  FormSection,
  SecurityText
} from './styles';
import { useMetadata } from '@/hooks/useMetadata';

interface PersonalDataForm {
  name: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { customer, isAuthenticated, checkAuth } = useAuth();
  const { formatPhone } = usePhoneFormat();
  const { validatePasswordMatch } = usePasswordValidation();
  const {
    loading,
    message,
    error,
    updateProfile,
    changePassword,
    handleLogout,
    clearMessage
  } = useCustomerProfile();

  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useMetadata({
    title: 'Minha Conta - Nutreon BR',
    description: 'Gerencie sua conta, endereços e pedidos na Nutreon',
    ogTitle: 'Minha Conta - Nutreon BR'
  });

  // Form para dados pessoais
  const {
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    reset: resetPersonal,
    formState: { errors: personalErrors }
  } = useForm<PersonalDataForm>({
    defaultValues: {
      name: customer?.name || '',
      phone: customer?.phone || ''
    }
  });

  // Form para senha
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors }
  } = useForm<PasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  // Hook para reenvio de verificação
  const {
    loading: resendLoading,
    success: resendSuccess,
    error: resendError,
    resendEmail
  } = useResendVerification();

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      // Sempre atualizar dados ao montar a página
      checkAuth().then(() => {
        if (!isAuthenticated) {
          router.push('/login?redirect=/conta');
        }
      });
    }
  }, [isAuthenticated, router, isInitialized, checkAuth]);

  useEffect(() => {
    if (customer) {
      resetPersonal({
        name: customer.name || '',
        phone: customer.phone || ''
      });
    }
  }, [customer, resetPersonal]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage();
    }
  }, [message, clearMessage]);

  useEffect(() => {
    if (resendSuccess) {
      toast.success('Email de verificação reenviado com sucesso! Verifique sua caixa de entrada.');
    }
  }, [resendSuccess]);

  useEffect(() => {
    if (resendError) {
      toast.error(resendError);
    }
  }, [resendError]);



  const onPersonalSubmit = async (data: PersonalDataForm) => {
    const result = await updateProfile(data);
    if (result && result.success) {
      setEditMode(false);
      // Força uma atualização do contexto de auth
      await checkAuth();
      // Atualiza o formulário com os novos dados
      if (result.data) {
        resetPersonal({
          name: result.data.name || '',
          phone: result.data.phone || ''
        });
      }
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    const result = await changePassword(data);
    if (result && result.success) {
      setChangePasswordMode(false);
      resetPassword();
    }
  };

  const handleResendVerification = useCallback(async () => {
    if (customer?.email) {
      await resendEmail(customer.email);
    }
  }, [customer?.email, resendEmail]);

  if (!isInitialized || !customer) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <LoadingWrapper className="text-center">
          <LoadingSpinner className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></LoadingSpinner>
          <LoadingText className="mt-4 text-gray-600">Carregando...</LoadingText>
        </LoadingWrapper>
      </Container>
    );
  }

  // Verificar se o email foi verificado
  if (!customer.verified) {
    return (
      <Container className="min-h-screen bg-gray-50 py-8">
        <AlertWrapper className="max-w-2xl mx-auto px-4">
          <Card className="bg-white rounded-lg shadow-md p-6">
            <Alert severity="warning" className="mb-6">
              Seu email ainda não foi verificado. Por favor, verifique sua caixa de entrada e clique no link de verificação.
            </Alert>
            
            <ButtonGroup className="flex gap-3 flex-wrap">
              <Button 
                variant="outlined" 
                onClick={() => router.push('/')}
              >
                Voltar para Home
              </Button>
              <Button 
                variant="contained" 
                onClick={handleResendVerification}
                disabled={resendLoading || resendSuccess}
              >
                {resendLoading ? 'Reenviando...' : 'Reenviar Email de Verificação'}
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleLogout}
              >
                Sair
              </Button>
            </ButtonGroup>
          </Card>
        </AlertWrapper>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen bg-gray-50 py-8">
      <AlertWrapper className="max-w-4xl mx-auto px-4">
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Minha Conta
              </CardTitle>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={20} />
                Sair
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Status de Verificação */}
            {!customer.verified && (
              <Alert severity="warning" className="mb-6">
                <div className="flex justify-between items-center">
                  <AlertText>
                    <AlertCircle className="inline mr-2" size={20} />
                    Seu email ainda não foi verificado. Verifique sua caixa de entrada.
                  </AlertText>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleResendVerification}
                    loading={resendLoading}
                    className="ml-4"
                  >
                    Reenviar email
                  </Button>
                </div>
              </Alert>
            )}

            {resendSuccess && (
              <Alert severity="success" className="mb-6">
                Email de verificação reenviado com sucesso!
              </Alert>
            )}

            {resendError && (
              <Alert severity="error" className="mb-6">
                {resendError}
              </Alert>
            )}

            {/* Dados Pessoais */}
            <Section className="mb-8">
              <SectionHeader className="flex justify-between items-center mb-4">
                <SectionTitle className="text-xl font-semibold text-gray-800">
                  Dados Pessoais
                </SectionTitle>
                {!editMode && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2"
                  >
                    <Pencil size={16} />
                    Editar
                  </Button>
                )}
              </SectionHeader>

              {editMode ? (
                <Form onSubmit={handlePersonalSubmit(onPersonalSubmit)} className="space-y-4">
                  <Controller
                    name="name"
                    control={personalControl}
                    rules={{ required: 'Nome é obrigatório' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nome completo"
                        fullWidth
                        error={!!personalErrors.name}
                        helperText={personalErrors.name?.message}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={personalControl}
                    rules={{ required: 'Telefone é obrigatório' }}
                    render={({ field }) => (
                      <PatternFormat
                        {...field}
                        format="(##) #####-####"
                        mask="_"
                        customInput={TextField}
                        label="Telefone"
                        fullWidth
                        error={!!personalErrors.phone}
                        helperText={personalErrors.phone?.message}
                      />
                    )}
                  />

                  <ButtonGroup className="flex gap-2 justify-end">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEditMode(false);
                        resetPersonal();
                      }}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      loading={loading}
                      className="flex items-center gap-2"
                    >
                      <Save size={16} />
                      Salvar
                    </Button>
                  </ButtonGroup>
                </Form>
              ) : (
                <FormSection className="space-y-3">
                  <InfoRow className="flex">
                    <Label className="text-gray-600 font-medium w-32">Nome:</Label>
                    <Value className="text-gray-900">{customer.name}</Value>
                  </InfoRow>
                  <InfoRow className="flex">
                    <Label className="text-gray-600 font-medium w-32">Email:</Label>
                    <Value className="text-gray-900 flex items-center gap-2">
                      {customer.email}
                      {customer.verified && (
                        <CheckCircle className="text-green-500" size={18} />
                      )}
                    </Value>
                  </InfoRow>
                  <InfoRow className="flex">
                    <Label className="text-gray-600 font-medium w-32">Telefone:</Label>
                    <Value className="text-gray-900">{formatPhone(customer.phone)}</Value>
                  </InfoRow>
                </FormSection>
              )}
            </Section>

            <Divider className="my-6 border-gray-200" />

            {/* Alterar Senha */}
            <Section>
              <SectionHeader className="flex justify-between items-center mb-4">
                <SectionTitle className="text-xl font-semibold text-gray-800">
                  Segurança
                </SectionTitle>
                {!changePasswordMode && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setChangePasswordMode(true)}
                    className="flex items-center gap-2"
                  >
                    <Lock size={16} />
                    Alterar Senha
                  </Button>
                )}
              </SectionHeader>

              {changePasswordMode ? (
                <Form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                  <Controller
                    name="currentPassword"
                    control={passwordControl}
                    rules={{ required: 'Senha atual é obrigatória' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Senha atual"
                        fullWidth
                        error={!!passwordErrors.currentPassword}
                        helperText={passwordErrors.currentPassword?.message}
                      />
                    )}
                  />

                  <Controller
                    name="newPassword"
                    control={passwordControl}
                    rules={{
                      required: 'Nova senha é obrigatória',
                      minLength: {
                        value: 8,
                        message: 'A senha deve ter no mínimo 8 caracteres'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Nova senha"
                        fullWidth
                        error={!!passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword?.message}
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={passwordControl}
                    rules={{
                      required: 'Confirmação de senha é obrigatória',
                      validate: value => validatePasswordMatch(value, newPassword)
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Confirmar nova senha"
                        fullWidth
                        error={!!passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword?.message}
                      />
                    )}
                  />

                  {error && (
                    <Alert severity="error">{error}</Alert>
                  )}

                  <ButtonGroup className="flex gap-2 justify-end">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setChangePasswordMode(false);
                        resetPassword();
                      }}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      loading={loading}
                      className="flex items-center gap-2"
                    >
                      <Save size={16} />
                      Alterar Senha
                    </Button>
                  </ButtonGroup>
                </Form>
              ) : (
                <SecurityText className="text-gray-600">
                  Recomendamos que você altere sua senha regularmente para manter sua conta segura.
                </SecurityText>
              )}
            </Section>
          </CardContent>
        </Card>
      </AlertWrapper>
    </Container>
  );
}