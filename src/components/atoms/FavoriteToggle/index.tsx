'use client';

import { useCallback } from 'react';
import { Heart } from 'lucide-react';
import { ToggleButton } from './styles';

interface FavoriteToggleProps {
  productId: string;
  isFavorite: boolean;
  onToggle: (productId: string) => void;
  disabled?: boolean;
  size?: number;
  className?: string;
}

export function FavoriteToggle({
  productId,
  isFavorite,
  onToggle,
  disabled = false,
  size = 20,
  className = ''
}: FavoriteToggleProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onToggle(productId);
    }
  }, [productId, onToggle, disabled]);

  return (
    <ToggleButton
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        disabled ? 'opacity-50 cursor-wait' : ''
      } ${className}`}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart 
        size={size} 
        className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
      />
    </ToggleButton>
  );
}