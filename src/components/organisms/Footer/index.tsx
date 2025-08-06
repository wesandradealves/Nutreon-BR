'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import SocialLinks from '@/components/molecules/SocialLinks';
import { 
  FooterContainer, 
  FooterContent, 
  FooterRow, 
  FooterColumn,
  LogoSection,
  PaymentSection,
  PaymentTitle,
  PaymentIcons,
  MenuSection,
  MenuTitle,
  MenuList,
  MenuItem,
  ContactSection,
  ContactTitle,
  ContactList,
  ContactItem,
  SecuritySection,
  SecurityTitle,
  CopyrightSection,
  CopyrightContainer,
  CopyrightRow,
  CopyrightContent,
  CopyrightText,
  CookiesSection,
  CookiesContent,
  CookiesText,
  CookiesButtonGroup,
  LogoLink,
  PaymentIcon,
  MenuLink,
  ContactIcon,
  ContactStrong,
  ContactLink,
  SecurityWrapper,
  SecurityCard,
  SecurityIcon,
  SecurityLabel,
  CopyrightWrapper,
  CopyrightSpan,
  CopyrightIcon,
  CookiesWrapper,
  CookiesLink,
  CookiesButton
} from './styles';

const paymentMethods = [
  { name: 'PIX', icon: 'fa-solid fa-qrcode' },
  { name: 'Visa', icon: 'fa-brands fa-cc-visa' },
  { name: 'Mastercard', icon: 'fa-brands fa-cc-mastercard' },
  { name: 'American Express', icon: 'fa-brands fa-cc-amex' },
  { name: 'Diners', icon: 'fa-brands fa-cc-diners-club' },
  { name: 'Elo', icon: 'fa-solid fa-credit-card' },
  { name: 'Hipercard', icon: 'fa-solid fa-credit-card' },
  { name: 'Vale Refeição', icon: 'fa-solid fa-utensils' },
  { name: 'Vale Alimentação', icon: 'fa-solid fa-shopping-basket' },
  { name: 'Boleto', icon: 'fa-solid fa-barcode' },
  { name: 'PayPal', icon: 'fa-brands fa-paypal' },
  { name: 'Stripe', icon: 'fa-brands fa-stripe' }
];

const institutionalLinks = [
  { href: '/refeicoes', label: 'Refeições Congeladas' },
  { href: '/kit-seja-chef', label: 'Kit Seja Chef' },
  { href: '/suplementos', label: 'Suplementos' },
  { href: '/consultoria', label: 'Consultoria Nutricional' },
  { href: '/quem-somos', label: 'Quem Somos' },
  { href: '/area-de-entrega', label: 'Área de Entrega' },
  { href: '/politica-de-reembolso', label: 'Política de Reembolso' },
  { href: '/termos-de-uso', label: 'Termos de Uso' }
];

export default function Footer() {
  const [showCookies, setShowCookies] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      setShowCookies(true);
    }
  }, []);

  const handleAcceptCookies = useCallback(() => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowCookies(false);
  }, []);

  return (
    <FooterContainer className="bg-dark-900 text-gray-300">
      <FooterContent className="container mx-auto px-4 py-12">
        <FooterRow className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo */}
          <FooterColumn className="lg:col-span-1 hidden md:block">
            <LogoSection className="flex h-full">
              <LogoLink href="/" className="block">
                <Image 
                  src="/img/logo.png" 
                  alt="Nutreon" 
                  width={160}
                  height={160}
                  className="h-20 w-auto"
                />
              </LogoLink>
            </LogoSection>
          </FooterColumn>

          {/* Formas de Pagamento */}
          <FooterColumn className="lg:col-span-1 hidden lg:block">
            <PaymentSection>
              <PaymentTitle className="text-lg font-semibold mb-4 text-white">
                Formas de pagamento
              </PaymentTitle>
              <PaymentIcons className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <PaymentIcon 
                    key={method.name} 
                    className={`${method.icon} text-2xl text-gray-400 hover:text-primary-500 transition-colors`}
                    title={method.name}
                  />
                ))}
              </PaymentIcons>
            </PaymentSection>
          </FooterColumn>

          {/* Institucional */}
          <FooterColumn className="lg:col-span-2">
            <MenuSection>
              <MenuTitle className="text-lg font-semibold mb-4 text-white">
                Institucional
              </MenuTitle>
              <MenuList className="space-y-2">
                {institutionalLinks.map((link) => (
                  <MenuItem key={link.href}>
                    <MenuLink 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                    >
                      {link.label}
                    </MenuLink>
                  </MenuItem>
                ))}
              </MenuList>
            </MenuSection>
          </FooterColumn>

          {/* Contato */}
          <FooterColumn className="lg:col-span-1">
            <ContactSection>
              <ContactTitle className="text-lg font-semibold mb-4 text-white">
                Contato
              </ContactTitle>
              <ContactList className="space-y-3 mb-6">
                <ContactItem className="flex items-center gap-2">
                  <ContactIcon className="fa-brands fa-whatsapp text-primary-500 text-lg" />
                  <ContactStrong className="text-white">11 99999-9999</ContactStrong>
                </ContactItem>
                <ContactItem className="flex items-center gap-2">
                  <ContactIcon className="fa-regular fa-envelope text-primary-500" />
                  <ContactLink 
                    href="mailto:contato@nutreon.com.br"
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    contato@nutreon.com.br
                  </ContactLink>
                </ContactItem>
              </ContactList>
              
              <SocialLinks 
                facebook="https://www.facebook.com/nutreon"
                youtube="https://www.youtube.com/nutreon"
                instagram="https://www.instagram.com/nutreon"
                whatsapp="https://api.whatsapp.com/send?phone=5511999999999&text=Olá!"
                className="mt-4"
              />
            </ContactSection>
          </FooterColumn>

          {/* Site Seguro */}
          <FooterColumn className="lg:col-span-1">
            <SecuritySection>
              <SecurityTitle className="text-lg font-semibold mb-4 text-white">
                Site seguro
              </SecurityTitle>
              <SecurityWrapper className="space-y-4">
                <SecurityCard className="bg-dark-800 p-4 rounded-lg text-center flex flex-col">
                  <SecurityIcon className="fa fa-lock text-3xl text-primary-500 mb-2 block" />
                  <SecurityLabel className="text-xs text-gray-400">Site Seguro</SecurityLabel>
                </SecurityCard>
                <SecurityCard className="bg-dark-800 p-4 rounded-lg text-center mt-3  flex flex-col">
                  <SecurityIcon className="fa-solid fa-shield-halved text-3xl text-primary-500 mb-2 block" />
                  <SecurityLabel className="text-xs text-gray-400">SSL Certificate</SecurityLabel>
                </SecurityCard>
              </SecurityWrapper>
            </SecuritySection>
          </FooterColumn>
        </FooterRow>
      </FooterContent>

      {/* Copyright */}
      <CopyrightSection className="bg-black py-6">
        <CopyrightContainer className="container mx-auto px-4">
          <CopyrightRow>
            <CopyrightContent className="flex flex-col md:flex-row items-center justify-between gap-4">
              <CopyrightText className="text-sm text-gray-400 text-center md:text-left">
                ® {currentYear} Nutreon - Todos os direitos reservados
              </CopyrightText>
              <CopyrightWrapper className="flex items-center gap-4">
                <CopyrightSpan className="text-xs text-gray-500">
                  <CopyrightIcon className="fa fa-lock mr-1" /> Navegação Segura
                </CopyrightSpan>
              </CopyrightWrapper>
            </CopyrightContent>
          </CopyrightRow>
        </CopyrightContainer>
      </CopyrightSection>

      {/* Cookies LGPD */}
      {showCookies && (
        <CookiesSection className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 p-4 md:p-6 z-50 shadow-2xl">
          <CookiesContent className="container mx-auto">
            <CookiesWrapper className="flex flex-col md:flex-row items-center justify-between gap-4">
              <CookiesText className="text-sm text-gray-300 text-center md:text-left flex-1">
                Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços. 
                Ao utilizar nossos serviços, você concorda com nossas{' '}
                <CookiesLink href="/politica-de-privacidade" className="text-primary-500 hover:text-primary-400 underline">
                  Políticas de Privacidade
                </CookiesLink>{' '}
                e{' '}
                <CookiesLink href="/politica-de-cookies" className="text-primary-500 hover:text-primary-400 underline">
                  Cookies
                </CookiesLink>.
              </CookiesText>
              <CookiesButtonGroup>
                <CookiesButton
                  onClick={handleAcceptCookies}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-2 rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  Aceito
                </CookiesButton>
              </CookiesButtonGroup>
            </CookiesWrapper>
          </CookiesContent>
        </CookiesSection>
      )}
    </FooterContainer>
  );
}