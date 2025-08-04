'use client';

import Link from 'next/link';
import { MobileMenuContainer, MobileButton, IconBar, MobileIcon } from './styles';
import DeliveryCheck from '@/components/atoms/DeliveryCheck';
import CartButton from '@/components/atoms/CartButton';

interface MobileMenuProps {
  isDelivering: boolean;
  deliveryAddress: string;
  cartCount: number;
  onDeliveryCheck: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onMenuToggle: () => void;
}

const MobileMenu = ({
  isDelivering,
  deliveryAddress,
  cartCount,
  onDeliveryCheck,
  onSearchClick,
  onCartClick,
  onMenuToggle
}: MobileMenuProps) => {
  return (
    <MobileMenuContainer className="flex items-center gap-2 lg:hidden">
      <DeliveryCheck
        isDelivering={isDelivering}
        address={deliveryAddress}
        onClick={onDeliveryCheck}
        className="text-xs"
      />
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onSearchClick}
          className="w-8 h-8 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center"
          aria-label="Buscar"
        >
          <MobileIcon className="fa fa-search text-gray-300 text-sm" />
        </button>
        
        <Link 
          href="/auth" 
          className="w-8 h-8 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center"
          aria-label="Login"
        >
          <MobileIcon className="fa fa-user text-gray-300 text-sm" />
        </Link>
        
        <CartButton 
          count={cartCount} 
          onClick={onCartClick}
          className="w-8 h-8 text-sm"
        />
        
        <MobileButton 
          type="button" 
          className="p-1" 
          onClick={onMenuToggle}
          aria-label="Menu"
        >
          <IconBar className="block w-6 h-0.5 bg-gray-300 mb-1" />
          <IconBar className="block w-6 h-0.5 bg-gray-300 mb-1" />
          <IconBar className="block w-6 h-0.5 bg-gray-300" />
        </MobileButton>
      </div>
    </MobileMenuContainer>
  );
};

export default MobileMenu;