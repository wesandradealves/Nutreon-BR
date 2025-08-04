'use client';

import IconButton from '../IconButton';
import { CartButtonContainer, CartButtonWrapper } from './styles';

interface CartButtonProps {
  count?: number;
  onClick: () => void;
  className?: string;
}

const CartButton = ({ 
  count = 0, 
  onClick,
  className = ''
}: CartButtonProps) => {
  return (
    <CartButtonContainer className={className}>
      <CartButtonWrapper className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-800 hover:bg-dark-700 transition-all duration-300 border border-dark-700">
        <IconButton
          onClick={onClick}
          icon={<i className="fa-solid fa-cart-shopping text-gray-300" />}
          badge={count}
          ariaLabel="Carrinho"
        />
      </CartButtonWrapper>
    </CartButtonContainer>
  );
};

export default CartButton;