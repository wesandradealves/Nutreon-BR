'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { useForm, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Snackbar,
} from '@mui/material';
import { 
  Logout as LogoutIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

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
  const { customer, logout, updateCustomer } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form para dados pessoais
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PersonalDataForm>({
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  // Atualizar valores do formulário quando customer mudar
  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name || '',
        phone: formatPhone(customer.phone),
      });
    }
  }, [customer, reset]);

  // Form para senha
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
    watch,
  } = useForm<PasswordForm>();

  const newPassword = watch('newPassword');

  // Função para formatar telefone
  const formatPhone = (phone: string | undefined): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const onSubmit = async (data: PersonalDataForm) => {
    setLoading(true);
    setError('');
    
    try {
      // Remover máscara do telefone antes de enviar
      const cleanPhone = data.phone ? data.phone.replace(/\D/g, '') : '';
      
      const response = await fetch('/api/customer/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          phone: cleanPhone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao atualizar dados');
      }

      setMessage('Dados atualizados com sucesso!');
      setIsEditing(false);
      
      // Atualizar dados no contexto
      if (result.customer) {
        updateCustomer({
          name: result.customer.name,
          phone: result.customer.phone,
        });
      }
    } catch (err) {
      setError((err as Error).message || 'Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/customer/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao alterar senha');
      }

      setMessage('Senha alterada com sucesso! Redirecionando para login...');
      resetPassword();
      setIsEditingPassword(false);
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    } catch (err) {
      setError((err as Error).message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    reset({
      name: customer?.name || '',
      phone: customer?.phone || '',
    });
    setIsEditing(false);
    setError('');
  };

  const handleCancelPasswordEdit = () => {
    resetPassword();
    setIsEditingPassword(false);
    setError('');
  };

  if (!customer) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Minha Conta
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Mensagens */}
        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={() => setMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setMessage('')} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Dados Pessoais */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Dados Pessoais
            </Typography>
            {!isEditing && (
              <IconButton
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                value={customer.email}
                disabled
                fullWidth
                helperText="O email não pode ser alterado"
              />

              <TextField
                label="Nome"
                {...register('name', {
                  required: 'Nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'Nome deve ter pelo menos 3 caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={!isEditing}
                fullWidth
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
                    message: 'Telefone inválido',
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <PatternFormat
                    {...field}
                    format="(##) #####-####"
                    mask=""
                    value={value}
                    onValueChange={(values) => {
                      onChange(values.formattedValue);
                    }}
                    disabled={!isEditing}
                    customInput={TextField}
                    label="Telefone"
                    error={!!errors.phone}
                    helperText={errors.phone?.message || 'Opcional'}
                    fullWidth
                  />
                )}
              />

              {isEditing && (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    disabled={loading}
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Segurança */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Segurança
            </Typography>
            {!isEditingPassword && (
              <IconButton
                color="primary"
                onClick={() => setIsEditingPassword(true)}
                sx={{ ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>

          <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Senha Atual"
                type="password"
                {...registerPassword('currentPassword', {
                  required: isEditingPassword ? 'Senha atual é obrigatória' : false,
                })}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword?.message}
                disabled={!isEditingPassword}
                fullWidth
              />

              <TextField
                label="Nova Senha"
                type="password"
                {...registerPassword('newPassword', {
                  required: isEditingPassword ? 'Nova senha é obrigatória' : false,
                  minLength: isEditingPassword ? {
                    value: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                  } : undefined,
                })}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword?.message}
                disabled={!isEditingPassword}
                fullWidth
              />

              <TextField
                label="Confirmar Nova Senha"
                type="password"
                {...registerPassword('confirmPassword', {
                  required: isEditingPassword ? 'Confirmação de senha é obrigatória' : false,
                  validate: isEditingPassword ? (value) =>
                    value === newPassword || 'As senhas não conferem' : undefined,
                })}
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword?.message}
                disabled={!isEditingPassword}
                fullWidth
              />

              {isEditingPassword && (
                <>
                  <Alert severity="warning">
                    Após alterar a senha, você será desconectado e precisará fazer login novamente.
                  </Alert>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
                      disabled={loading}
                    >
                      Alterar Senha
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancelPasswordEdit}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </form>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Ações */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => router.push('/')}>
            Continuar Comprando
          </Button>
          <Button variant="outlined">
            Meus Pedidos
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}