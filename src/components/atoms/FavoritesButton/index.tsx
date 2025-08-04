'use client';

import { useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFavoritesContext } from '@/context/favorites';
import { FavoritesButtonContainer, IconWrapper, Badge } from './styles';

interface FavoritesButtonProps {
  className?: string;
}

export function FavoritesButton({ className }: FavoritesButtonProps) {
  const router = useRouter();
  const { favorites } = useFavoritesContext();
  const favoritesCount = favorites.length;

  const handleClick = useCallback(() => {
    router.push('/conta/favoritos');
  }, [router]);

  return (
    <FavoritesButtonContainer
      onClick={handleClick}
      className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-800 ${className || ''}`}
      aria-label={`Favoritos (${favoritesCount} itens)`}
    >
      <IconWrapper className="relative">
        <Heart 
          size={24} 
          className={favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400'}
        />
        {favoritesCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {favoritesCount > 99 ? '99+' : favoritesCount}
          </Badge>
        )}
      </IconWrapper>
    </FavoritesButtonContainer>
  );
}