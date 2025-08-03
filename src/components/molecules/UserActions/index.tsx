'use client';

import Link from 'next/link';
import { PersonOutline, Share } from '@mui/icons-material';
import { UserActionsContainer } from './styles';
import CartButton from '@/components/atoms/CartButton';

interface UserActionsProps {
  isAuthenticated: boolean;
  userName?: string;
  cartCount?: number;
  onCartClick: () => void;
  className?: string;
}

const UserActions = ({ 
  isAuthenticated, 
  userName,
  cartCount = 0,
  onCartClick,
  className = ''
}: UserActionsProps) => {
  return (
    <UserActionsContainer className={`user-actions ${className}`}>
      <ul className="user-actions__list">
        {/* Carrinho */}
        <li className="user-actions__item user-actions__item--cart">
          <CartButton count={cartCount} onClick={onCartClick} />
        </li>

        {/* Login/Cadastro */}
        {isAuthenticated ? (
          <li className="user-actions__item user-actions__item--account">
            <Link href="/conta" className="user-actions__link" aria-label="Minha Conta">
              <PersonOutline className="user-actions__icon" />
              Olá, {userName}
            </Link>
          </li>
        ) : (
          <>
            <li className="user-actions__item user-actions__item--register">
              <Link href="/auth?tab=1" className="user-actions__link" aria-label="Cadastre-se">
                <PersonOutline className="user-actions__icon" />
                Cadastre-se
              </Link>
            </li>
            <li className="user-actions__item user-actions__item--login">
              <Link href="/auth" className="user-actions__link" aria-label="Login">
                <Share className="user-actions__icon" />
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </UserActionsContainer>
  );
};

export default UserActions;