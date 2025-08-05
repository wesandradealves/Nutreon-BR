import { useMemo } from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'contained', 
  color = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ...props 
}: ButtonProps) {
  const variantClasses = useMemo(() => {
    if (variant === 'contained') {
      if (color === 'primary') return 'bg-cyan-500 text-white hover:bg-cyan-600';
      if (color === 'secondary') return 'bg-gray-500 text-white hover:bg-gray-600';
      if (color === 'error') return 'bg-red-500 text-white hover:bg-red-600';
    }
    
    if (variant === 'outlined') {
      if (color === 'primary') return 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50';
      if (color === 'secondary') return 'border-2 border-gray-500 text-gray-500 hover:bg-gray-50';
      if (color === 'error') return 'border-2 border-red-500 text-red-500 hover:bg-red-50';
    }
    
    if (variant === 'text') {
      if (color === 'primary') return 'text-cyan-500 hover:bg-cyan-50';
      if (color === 'secondary') return 'text-gray-500 hover:bg-gray-50';
      if (color === 'error') return 'text-red-500 hover:bg-red-50';
    }
    
    return '';
  }, [variant, color]);

  return (
    <StyledButton
      className={`
        px-4 py-2 rounded-md font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses}
        ${className || ''}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </StyledButton>
  );
}