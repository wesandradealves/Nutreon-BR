'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAuth } from '@/context/auth';
import {
  Container,
  IndiqueAmigoHeader,
  Header as HeaderStyled,
  NavBar,
  BoxTop,
  RedeSocialTopo,
  ContatoTopo,
  BuscaFull,
  BtnConsultarEntrega,
  CarrinhoTopo,
  Logo,
  BoxRight,
  MenuPrincipal
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

  const verificaEntregaCep = () => {
    console.log('Verificar entrega');
  };

  const openCarrinhoRight = () => {
    console.log('Abrir carrinho');
  };

  return (
    <>
      <IndiqueAmigoHeader className="indique-amigo-header bg-green-600 text-white py-2">
        <i className="fa fa-thumbs-o-up mr-2"></i>
        <a href="#" className="indique-amigo-header-item text-white hover:underline">
          Convide um amigo para experimentar e ganhe R$ 20,00
        </a>
      </IndiqueAmigoHeader>

      <HeaderStyled className="header bg-white">
        <NavBar className="navbar navbar-default">
          <BoxTop className="box-top css-desktop hidden lg:block border-b border-gray-200">
            <Container className="container mx-auto px-4">
              <div className="row">
                <div className="flex items-center justify-between w-full">
                  <div className="col-xs-5 col-md-4">
                    <div className="flex items-center gap-4">
                      <RedeSocialTopo className="rede-social-topo flex items-center gap-2">
                        <a href="https://www.facebook.com/nutreon" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600">
                          <i className="fa-brands fa-facebook-f"></i>
                          <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://www.youtube.com/nutreon" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600">
                          <i className="fa-brands fa-youtube"></i>
                          <span className="sr-only">Youtube</span>
                        </a>
                        <a href="https://www.instagram.com/nutreon" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600">
                          <i className="fa-brands fa-instagram"></i>
                          <span className="sr-only">Instagram</span>
                        </a>
                        <a className="desktop hidden lg:inline" href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá!" target="_blank" rel="noopener">
                          <i className="fa-brands fa-whatsapp text-gray-600 hover:text-green-600" data-placement="bottom" data-original-title="WhatsApp (11) 99999-9999" data-toggle="tooltip">
                            <span className="sr-only">WhatsApp</span>
                          </i>
                        </a>
                      </RedeSocialTopo>
                      
                      <ContatoTopo className="contato-topo text-gray-600">
                        <p className="text-sm">11 99999-9999</p>
                      </ContatoTopo>
                    </div>
                  </div>
                  
                  <div className="col-xs-7 col-md-8">
                    <div className="flex-end flex items-center gap-4">
                      <BuscaFull className="busca mod-full">
                        <a href="javascript:;" className="btn-abrir js-abrir-busca flex items-center gap-2 text-gray-600 hover:text-green-600">
                          O que procura? 
                          <i className="fa fa-search"></i>
                        </a>
                      </BuscaFull>
                      
                      <BtnConsultarEntrega 
                        href="javascript:;" 
                        onClick={verificaEntregaCep}
                        className="btn-consultar-entrega js-entrega-open border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <i className="fa fa-map-marker text-gray-600"></i>
                          <div className="js-entrega-msg" style={{ display: isDelivering ? 'none' : 'block' }}>
                            <h5 className="text-sm font-medium">Será que entrega?</h5>
                          </div>
                          <div className="js-entrega-msg-ok" style={{ display: isDelivering ? 'block' : 'none' }}>
                            <h6 className="text-xs">Entregar em</h6>
                            <h6 className="text-xs"><span className="js-entrega-msg-endereco">{deliveryAddress}</span></h6>
                          </div>
                        </div>
                      </BtnConsultarEntrega>
                      
                      <CarrinhoTopo className="carrinho-topo hidden-xs">
                        <ul className="nav nav-pills flex items-center gap-3">
                          <li id="cesta-topo1" className="dropdown valor-compra hidden-xs">
                            <div className="box-carrinho-mobile">
                              <a 
                                href="javascript:" 
                                onClick={openCarrinhoRight} 
                                className="btn-open relative bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center"
                                aria-label="Carrinho"
                              >
                                <i className="fa-solid fa-cart-shopping text-gray-600"></i>
                                <span className="badge js-cesta-total-produtos-notext absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {cartCount}
                                </span>
                              </a>
                            </div>
                          </li>
                          
                          {!isClient ? null : isAuthenticated ? (
                            <li className="entrar">
                              <Link href="/conta" aria-label="Minha Conta" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                                <i className="icon-perfil fa fa-user-o"></i>
                                Olá, {customer?.name?.split(' ')[0]}
                              </Link>
                            </li>
                          ) : (
                            <>
                              <li className="cadastre-se">
                                <Link href="/auth?tab=1" aria-label="Cadastre-se" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                                  <i className="icon-perfil fa fa-user-o"></i>
                                  Cadastre-se
                                </Link>
                              </li>
                              <li className="entrar">
                                <Link href="/auth" aria-label="Login" className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                                  <i className="icon-entrar fa fa-share"></i>
                                  Login
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </CarrinhoTopo>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </BoxTop>
          
          <Container className="container mx-auto px-4">
            <div className="row">
              <div className="flex no-flex-sm header-center items-center justify-between">
                <div className="col-xs-12 col-md-3 col-lg-2">
                  <div className="navbar-header">
                    <div className="flex-space flex items-center justify-between">
                      <Logo className="logo">
                        <Link href="/" aria-label="Nutreon - Nutrindo Saúde, Transformando Vidas">
                          <LazyLoadImage 
                            className="img-responsive" 
                            src="/logo.PNG" 
                            alt="Nutreon" 
                            title="Nutreon"
                            width={160}
                            height={64}
                            style={{ maxHeight: '64px', width: 'auto' }}
                            effect="blur"
                          />
                        </Link>
                      </Logo>
                      
                      <BoxRight className="box-right css-mobile flex items-center gap-2 lg:hidden">
                        <BtnConsultarEntrega 
                          href="javascript:;" 
                          onClick={verificaEntregaCep}
                          className="btn-consultar-entrega js-entrega-open border border-gray-300 rounded px-2 py-1"
                        >
                          <div className="flex items-center gap-1">
                            <i className="fa fa-map-marker text-sm"></i>
                            <div className="js-entrega-msg" style={{ display: isDelivering ? 'none' : 'block' }}>
                              <h5 className="text-xs">Será que entrega?</h5>
                            </div>
                          </div>
                        </BtnConsultarEntrega>
                        
                        <div className="flex-end flex items-center gap-2">
                          <a href="javascript:;" className="item-busca btn-abrir js-abrir-busca w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <i className="fa fa-search text-gray-600 text-sm"></i>
                            <span className="sr-only">Busca</span>
                          </a>
                          
                          <Link href="/auth" className="item-login w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <i className="fa fa-user text-gray-600 text-sm"></i>
                            <span className="sr-only">Entrar</span>
                          </Link>
                          
                          <div className="box-carrinho-mobile">
                            <a 
                              href="javascript:;" 
                              onClick={openCarrinhoRight} 
                              className="btn-open relative bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
                            >
                              <i className="fa fa-shopping-cart text-gray-600 text-sm"></i>
                              <span className="badge js-cesta-total-produtos-notext absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                              </span>
                            </a>
                          </div>
                          
                          <button 
                            type="button" 
                            className="navbar-toggle p-1" 
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            aria-label="Menu"
                          >
                            <span className="icon-bar block w-6 h-0.5 bg-gray-600 mb-1"></span>
                            <span className="icon-bar block w-6 h-0.5 bg-gray-600 mb-1"></span>
                            <span className="icon-bar block w-6 h-0.5 bg-gray-600"></span>
                          </button>
                        </div>
                      </BoxRight>
                    </div>
                  </div>
                </div>
                
                <div className="col-xs-12 col-md-9 col-lg-10 col-menu-full">
                  <MenuPrincipal className="menu-principal css-desktop hidden lg:block">
                    <ul className="nav navbar-nav flex items-center gap-1">
                      <li className="dropdown submenu-default relative group">
                        <a className="dropdown-toggle px-4 py-2 text-gray-700 hover:text-green-600" href="javascript:;" aria-label="Refeições Congeladas">
                          Refeições Congeladas <i className="fa fa-caret-down ml-1"></i>
                        </a>
                        <ul className="dropdown-menu absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <li className="menu-todas-as-refeicoes">
                            <Link href="/refeicoes/todas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Todas as Refeições
                            </Link>
                          </li>
                          <li>
                            <Link href="/refeicoes/essencial" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Linha Essencial
                            </Link>
                          </li>
                          <li>
                            <Link href="/refeicoes/performance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Linha Performance
                            </Link>
                          </li>
                          <li>
                            <Link href="/refeicoes/gourmet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Linha Gourmet
                            </Link>
                          </li>
                          <li>
                            <Link href="/refeicoes/kids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Linha Kids
                            </Link>
                          </li>
                          <li>
                            <Link href="/refeicoes/personalizada" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600">
                              Linha Personalizada
                            </Link>
                          </li>
                        </ul>
                      </li>
                      
                      <li>
                        <Link href="/kit-seja-chef" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Kit Seja Chef
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/suplementos" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Suplementos
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/consultoria" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Consultoria
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/quem-somos" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Quem Somos
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/blog" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Blog
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/contato" className="px-4 py-2 text-gray-700 hover:text-green-600">
                          Contato
                        </Link>
                      </li>
                    </ul>
                  </MenuPrincipal>
                </div>
              </div>
            </div>
          </Container>
        </NavBar>
      </HeaderStyled>
    </>
  );
};

export default Header;