'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAuth } from '@/context/auth';
import Navigation from '@/components/molecules/Navigation';
import TopBar from '@/components/organisms/TopBar';
import MobileMenu from '@/components/molecules/MobileMenu';
import {
  Container,
  IndiqueAmigoHeader,
  HeaderContainer,
  NavBar,
  Logo,
  SocialLink,
  IconText
} from './styles';

interface HeaderProps {
  scrollPosition?: number;
}


const Header = ({}: HeaderProps) => {
  const { isAuthenticated, customer } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount] = useState(0);
  const [isDelivering] = useState(false);
  const [deliveryAddress] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigationItems = useMemo(() => [
    {
      label: 'Refeições Congeladas',
      href: '/refeicoes',
      children: [
        { label: 'Todas as Refeições', href: '/refeicoes/todas' },
        { label: 'Linha Essencial', href: '/refeicoes/essencial' },
        { label: 'Linha Performance', href: '/refeicoes/performance' },
        { label: 'Linha Gourmet', href: '/refeicoes/gourmet' },
        { label: 'Linha Kids', href: '/refeicoes/kids' },
        { label: 'Linha Personalizada', href: '/refeicoes/personalizada' }
      ]
    },
    { label: 'Kit Seja Chef', href: '/kit-seja-chef' },
    { label: 'Suplementos', href: '/suplementos' },
    { label: 'Consultoria', href: '/consultoria' },
    { label: 'Quem Somos', href: '/quem-somos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' }
  ], []);

  const verificaEntregaCep = useCallback(() => {
    // TODO: Implementar verificação de entrega
  }, []);

  const openCarrinhoRight = useCallback(() => {
    // TODO: Implementar abertura do carrinho
  }, []);

  const openSearch = useCallback(() => {
    // TODO: Implementar abertura da busca
  }, []);

  return (
    <>
      <IndiqueAmigoHeader className="bg-primary-500 text-white py-2">
        <Container className="container mx-auto px-4 flex items-center justify-center">
          <IconText className="fa fa-thumbs-o-up mr-2" />
          <SocialLink href="#" className="text-white hover:underline">
            Convide um amigo para experimentar e ganhe R$ 20,00
          </SocialLink>
        </Container>
      </IndiqueAmigoHeader>

      <HeaderContainer className="bg-dark-900">
        <TopBar
          isDelivering={isDelivering}
          deliveryAddress={deliveryAddress}
          cartCount={cartCount}
          isAuthenticated={isClient && isAuthenticated}
          customerName={customer?.name?.split(' ')[0]}
          onDeliveryCheck={verificaEntregaCep}
          onSearchClick={openSearch}
          onCartClick={openCarrinhoRight}
        />
        
        <NavBar>
          <Container className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <Logo>
                <Link href="/" aria-label="Nutreon - Nutrindo Saúde, Transformando Vidas">
                  <LazyLoadImage 
                    src="/img/logo.png" 
                    alt="Nutreon" 
                    title="Nutreon"
                    width={160}
                    height={64}
                    className="max-h-16 w-auto"
                    effect="blur"
                  />
                </Link>
              </Logo>
              
              <Navigation 
                items={navigationItems} 
                className="hidden lg:block"
              />
              
              <MobileMenu
                isDelivering={isDelivering}
                deliveryAddress={deliveryAddress}
                cartCount={cartCount}
                onDeliveryCheck={verificaEntregaCep}
                onSearchClick={openSearch}
                onCartClick={openCarrinhoRight}
                onMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
              />
            </div>
          </Container>
        </NavBar>
      </HeaderContainer>
    </>
  );
};

export default Header;