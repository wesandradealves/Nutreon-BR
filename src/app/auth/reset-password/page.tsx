'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  LinearProgress,
} from '@mui/material';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        router.push('/auth?tab=0');
      }, 3000);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'error';
    if (passwordStrength.score <= 2) return 'warning';
    if (passwordStrength.score <= 3) return 'info';
    return 'success';
  };

  const getPasswordStrengthValue = () => {
    return (passwordStrength.score / 4) * 100;
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Senha redefinida com sucesso!
          </Alert>
          <Typography>
            Você será redirecionado para a página de login...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Redefinir Senha
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!token ? (
            <Alert severity="error">
              Link de recuperação inválido. Por favor, solicite um novo email de recuperação.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nova Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                error={!!passwordError}
                helperText={passwordError}
              />
              
              {password && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Força da senha: {passwordStrength.feedback}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={getPasswordStrengthValue()}
                    color={getPasswordStrengthColor()}
                    sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
                  />
                </Box>
              )}

              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                error={password !== confirmPassword && confirmPassword !== ''}
                helperText={
                  password !== confirmPassword && confirmPassword !== ''
                    ? 'As senhas não coincidem'
                    : ''
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                disabled={loading || !password || !confirmPassword || !!passwordError}
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2 }}
                onClick={() => router.push('/auth')}
                disabled={loading}
              >
                Voltar para Login
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}