'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { LoadingContainer, SpinnerWrapper } from './styles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <LoadingContainer className="max-w-7xl mx-auto px-4 flex justify-center mt-32">
        <SpinnerWrapper>
          <div className="spinner w-10 h-10 rounded-full" />
        </SpinnerWrapper>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}