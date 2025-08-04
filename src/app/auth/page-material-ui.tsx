'use client';

import { useSearchParams } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { useResendVerification } from '@/hooks/useResendVerification';
import { PatternFormat } from 'react-number-format';
import { useState } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';

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
    resendEmail,
    reset: resetResend
  } = useResendVerification();
  
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [resendEmailValue, setResendEmailValue] = useState('');

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySuccess(false);
    
    const success = await requestPasswordReset(recoveryEmail);
    if (success) {
      setRecoverySuccess(true);
      setRecoveryEmail('');
    }
  };
  
  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    await resendEmail(resendEmailValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3}>
        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Cadastro" />
          <Tab label="Recuperar Senha" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
            {error.includes('Email não verificado') && !showResendEmail && (
              <Button 
                size="small" 
                onClick={() => {
                  setShowResendEmail(true);
                  setResendEmailValue(loginData.email);
                }}
                sx={{ mt: 1, display: 'block' }}
              >
                Reenviar email de verificação
              </Button>
            )}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ m: 2 }}>
            {success}
          </Alert>
        )}
        
        {/* Formulário de Reenvio de Email */}
        {showResendEmail && (
          <Box component="form" onSubmit={handleResendVerification} sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Digite seu email para receber um novo link de verificação
            </Alert>
            
            {resendError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {resendError}
              </Alert>
            )}
            
            {resendSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Email de verificação reenviado! Verifique sua caixa de entrada.
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={resendEmailValue}
              onChange={(e) => setResendEmailValue(e.target.value)}
              margin="normal"
              required
              disabled={resendLoading || resendSuccess}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={resendLoading || resendSuccess || !resendEmailValue}
              >
                {resendLoading ? 'Enviando...' : 'Reenviar Email'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => {
                  setShowResendEmail(false);
                  resetResend();
                  setResendEmailValue('');
                }}
                disabled={resendLoading}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        )}

        {/* Formulário de Login */}
        {tab === 0 && (
          <Box component="form" onSubmit={handleLogin} sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={loginData.email}
              onChange={(e) => updateLoginData('email', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={loginData.password}
              onChange={(e) => updateLoginData('password', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 2 }}
              onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 2)}
              disabled={loading}
            >
              Esqueceu sua senha?
            </Button>
          </Box>
        )}

        {/* Formulário de Cadastro */}
        {tab === 1 && (
          <Box component="form" onSubmit={handleRegister} sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Nome"
              value={registerData.name}
              onChange={(e) => updateRegisterData('name', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={registerData.email}
              onChange={(e) => updateRegisterData('email', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <PatternFormat
              format="(##) #####-####"
              mask=""
              value={registerData.phone}
              onValueChange={(values) => {
                updateRegisterData('phone', values.formattedValue);
              }}
              customInput={TextField}
              label="Telefone"
              margin="normal"
              fullWidth
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={registerData.password}
              onChange={(e) => updateRegisterData('password', e.target.value)}
              margin="normal"
              required
              disabled={loading}
              helperText="Mínimo 6 caracteres"
            />
            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              value={registerData.confirmPassword}
              onChange={(e) => updateRegisterData('confirmPassword', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Box>
        )}

        {/* Formulário de Recuperação de Senha */}
        {tab === 2 && (
          <Box component="form" onSubmit={handlePasswordRecovery} sx={{ p: 3 }}>
            {recoverySuccess ? (
              <Alert severity="success">
                Email de recuperação enviado! Verifique sua caixa de entrada.
              </Alert>
            ) : (
              <>
                {recoveryError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {recoveryError}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  margin="normal"
                  required
                  disabled={recoveryLoading}
                  helperText="Digite o email cadastrado para receber as instruções de recuperação"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={recoveryLoading || !recoveryEmail}
                >
                  {recoveryLoading ? 'Enviando...' : 'Enviar Email de Recuperação'}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  sx={{ mt: 2 }}
                  onClick={() => handleTabChange(null as unknown as React.SyntheticEvent, 0)}
                  disabled={recoveryLoading}
                >
                  Voltar para Login
                </Button>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}