'use client';

import { CartButtonContainer } from './styles';

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
      <div className="box-carrinho-mobile">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="btn-open"
          aria-label="Carrinho"
        >
          <i className="fa fa-shopping-cart"></i>
          <span className="badge js-cesta-total-produtos-notext">
            {count}
          </span>
        </a>
      </div>
    </CartButtonContainer>
  );
};

export default CartButton;