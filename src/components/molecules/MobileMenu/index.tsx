'use client';

import { MobileMenuContainer, MobileButton, IconBar, MobileIcon, ButtonsWrapper, SearchButton, LoginLink } from './styles';
import DeliveryCheck from '@/components/atoms/DeliveryCheck';
import { CartButton } from '@/components/atoms/CartButton';
import CartDrawer from '@/components/organisms/CartDrawer';
import { useCartDrawer } from '@/context/cartDrawer';

interface MobileMenuProps {
  isDelivering: boolean;
  deliveryAddress: string;
  onDeliveryCheck: () => void;
  onSearchClick: () => void;
  onMenuToggle: () => void;
}

const MobileMenu = ({
  isDelivering,
  deliveryAddress,
  onDeliveryCheck,
  onSearchClick,
  onMenuToggle
}: MobileMenuProps) => {
  const { isOpen: isCartOpen, openDrawer, closeDrawer } = useCartDrawer();

  return (
    <MobileMenuContainer className="flex items-center gap-2 lg:hidden">
      <DeliveryCheck
        isDelivering={isDelivering}
        address={deliveryAddress}
        onClick={onDeliveryCheck}
        className="text-xs"
      />
      
      <ButtonsWrapper className="flex items-center gap-2">
        <SearchButton 
          onClick={onSearchClick}
          className="w-8 h-8 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center"
          aria-label="Buscar"
        >
          <MobileIcon className="fa fa-search text-gray-300 text-sm" />
        </SearchButton>
        
        <LoginLink 
          href="/auth" 
          className="w-8 h-8 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center"
          aria-label="Login"
        >
          <MobileIcon className="fa fa-user text-gray-300 text-sm" />
        </LoginLink>
        
        <CartButton className="w-8 h-8 text-sm" onClick={openDrawer} />
        
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
      </ButtonsWrapper>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeDrawer} />
    </MobileMenuContainer>
  );
};

export default MobileMenu;