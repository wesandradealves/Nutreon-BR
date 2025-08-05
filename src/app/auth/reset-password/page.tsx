'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePasswordRecovery } from '@/hooks/usePasswordRecovery';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { Container, Card, Form, Title, PasswordStrengthBar } from './styles';

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
        router.push('/auth?tab=0');
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
      <Container className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <Alert severity="success" className="mb-4">
            Senha redefinida com sucesso!
          </Alert>
          <p className="text-gray-700">
            Você será redirecionado para a página de login...
          </p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <Title className="text-2xl font-bold text-center text-gray-800 mb-6">
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
                <div className="mb-4">
                  <span className="text-sm text-gray-600">
                    Força da senha: {passwordStrength.feedback}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <PasswordStrengthBar 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor}`}
                      style={{ width: `${getPasswordStrengthValue}%` }}
                    />
                  </div>
                </div>
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
                className="mb-3"
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={() => router.push('/auth')}
                disabled={loading}
              >
                Voltar para Login
              </Button>
            </Form>
          )}
        </div>
      </Card>
    </Container>
  );
}