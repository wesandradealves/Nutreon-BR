'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Container } from './styles';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/unauthorized');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <Container className="min-h-screen flex items-center justify-center">
        <p>Não autorizado. Redirecionando...</p>
      </Container>
    );
  }

  return <>{children}</>;
}