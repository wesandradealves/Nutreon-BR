'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { 
  UserActionsContainer, 
  ActionsList, 
  ActionItem, 
  ActionLink,
  ActionIcon,
  UserDropdown,
  UserDropdownMenu,
  UserDropdownItem,
  UserDropdownLink
} from './styles';
import { CartButton } from '@/components/atoms/CartButton';
import { FavoritesButton } from '@/components/atoms/FavoritesButton';
import CartDrawer from '@/components/organisms/CartDrawer';

interface UserActionsProps {
  isAuthenticated: boolean;
  userName?: string;
  className?: string;
}

const UserActions = ({ 
  isAuthenticated, 
  userName,
  className = ''
}: UserActionsProps) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/');
  }, [logout, router]);

  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <UserActionsContainer className={`hidden md:block ${className}`}>
      <ActionsList className="flex items-center gap-4 m-0 p-0 list-none">
        {/* Favoritos */}
        <ActionItem className="relative">
          <FavoritesButton />
        </ActionItem>

        {/* Carrinho */}
        <ActionItem className="relative">
          <CartButton onClick={handleCartClick} />
        </ActionItem>

        {/* Login/Cadastro */}
        {isAuthenticated ? (
          <ActionItem className="relative group">
            <UserDropdown>
              <ActionLink 
                href="#" 
                className="flex items-center gap-1 text-gray-300 no-underline text-sm transition-colors hover:text-primary-500 cursor-pointer" 
                aria-label="Minha Conta"
              >
                <ActionIcon className="fa fa-user-o text-lg" />
                Olá, {userName}
                <ActionIcon className="fa fa-chevron-down text-xs ml-1" />
              </ActionLink>
              
              <UserDropdownMenu className="absolute top-full right-0 mt-1 min-w-[180px] bg-dark-800 border border-dark-700 rounded shadow-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 list-none">
                <UserDropdownItem>
                  <UserDropdownLink 
                    href="/conta" 
                    className="block px-4 py-2 text-gray-300 no-underline text-sm transition-all hover:bg-dark-700 hover:text-primary-500"
                  >
                    <ActionIcon className="fa fa-user mr-2" />
                    Minha Conta
                  </UserDropdownLink>
                </UserDropdownItem>
                <UserDropdownItem>
                  <ActionLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="block px-4 py-2 text-gray-300 no-underline text-sm transition-all hover:bg-dark-700 hover:text-primary-500 cursor-pointer"
                  >
                    <ActionIcon className="fa fa-sign-out mr-2" />
                    Sair
                  </ActionLink>
                </UserDropdownItem>
              </UserDropdownMenu>
            </UserDropdown>
          </ActionItem>
        ) : (
          <>
            <ActionItem>
              <Link href="/auth?tab=1" className="flex items-center gap-1 text-gray-300 no-underline text-sm transition-colors hover:text-primary-500" aria-label="Cadastre-se">
                <ActionIcon className="fa fa-user-o text-lg" />
                Cadastre-se
              </Link>
            </ActionItem>
            <ActionItem>
              <Link href="/auth" className="flex items-center gap-1 text-gray-300 no-underline text-sm transition-colors hover:text-primary-500" aria-label="Login">
                <ActionIcon className="fa fa-share text-lg" />
                Login
              </Link>
            </ActionItem>
          </>
        )}
      </ActionsList>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
    </UserActionsContainer>
  );
};

export default UserActions;