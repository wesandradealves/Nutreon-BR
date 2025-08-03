'use client';

import { Container } from './styles';
import 'hamburgers/dist/hamburgers.css';
import classNames from 'classnames';
import Props from './typo';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import { Person as PersonIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const Header = ({ scrollPosition }: Props) => {
  const { isAuthenticated, customer } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <Container
      className={classNames("w-full header flex items-center justify-between px-8 py-4", {
        'scrolled': scrollPosition > 0,
      })}
    >
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold hover:text-green-600 transition-colors">
          Nutreon
        </Link>
      </div>
      
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
          Início
        </Link>
        <Link href="/produtos" className="text-gray-700 hover:text-green-600 transition-colors">
          Produtos
        </Link>
        <Link href="/carrinho" className="text-gray-700 hover:text-green-600 transition-colors">
          Carrinho
        </Link>
        {!isClient ? (
          <Link href="/auth" className="text-gray-700 hover:text-green-600 transition-colors">
            Entrar
          </Link>
        ) : isAuthenticated ? (
          <Link href="/conta" className="text-gray-700 hover:text-green-600 transition-colors flex items-center gap-1">
            <PersonIcon fontSize="small" />
            {customer?.name?.split(' ')[0] || 'Conta'}
          </Link>
        ) : (
          <Link href="/auth" className="text-gray-700 hover:text-green-600 transition-colors">
            Entrar
          </Link>
        )}
      </nav>
    </Container>
  );
};

export default Header;
