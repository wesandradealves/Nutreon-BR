'use client';

import { useCallback, useMemo } from 'react';
import { StyledLink } from './styles';
import type { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'underline';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({ 
  children, 
  variant = 'primary', 
  className,
  onClick,
  ...props 
}: LinkProps) {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'text-primary-500 hover:text-primary-600 transition-colors';
      case 'secondary':
        return 'text-gray-600 hover:text-gray-800 transition-colors';
      case 'underline':
        return 'text-primary-500 hover:text-primary-600 underline transition-colors';
      default:
        return '';
    }
  }, [variant]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  return (
    <StyledLink
      className={`${variantClasses} ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledLink>
  );
}