'use client';

import { useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartButtonContainer, IconWrapper, Badge } from './styles';

interface CartButtonProps {
  className?: string;
  onClick: () => void;
}

export function CartButton({ className, onClick }: CartButtonProps) {
  const { itemCount } = useCart();

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <CartButtonContainer
      onClick={handleClick}
      className={`relative flex items-center justify-center p-2 rounded-lg hover:bg-dark-800 transition-colors ${className}`}
      aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <IconWrapper className="relative">
        <ShoppingCart 
          size={20} 
          className="text-gray-300 hover:text-primary-500 transition-colors"
        />
        {itemCount > 0 && (
          <Badge className="absolute -top-[12px] -right-[12px] bg-primary-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </IconWrapper>
    </CartButtonContainer>
  );
}