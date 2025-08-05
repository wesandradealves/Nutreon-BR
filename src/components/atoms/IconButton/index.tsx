'use client';

import { ReactNode, useCallback } from 'react';
import { StyledButton, Badge } from './styles';

interface IconButtonProps {
  onClick: () => void;
  icon: ReactNode;
  badge?: number;
  ariaLabel: string;
  className?: string;
  children?: ReactNode;
}

const IconButton = ({ 
  onClick,
  icon,
  badge,
  ariaLabel,
  className = '',
  children
}: IconButtonProps) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  }, [onClick]);

  return (
    <StyledButton 
      href="#" 
      onClick={handleClick}
      className={`inline-flex items-center gap-2 no-underline text-inherit relative cursor-pointer transition-all duration-300 hover:opacity-80 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
      {icon}
      {badge !== undefined && (
        <Badge className="absolute -top-[12px] -right-[12px] bg-primary-500 text-white text-xs min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center font-bold">
          {badge}
        </Badge>
      )}
    </StyledButton>
  );
};

export default IconButton;