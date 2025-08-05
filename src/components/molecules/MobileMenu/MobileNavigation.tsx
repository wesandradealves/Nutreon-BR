'use client';

import { Fragment, useState, useCallback, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '@/context/auth';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const MobileNavOverlay = styled.div``;
const MobileNavContainer = styled.nav``;
const MobileNavHeader = styled.div``;
const CloseButton = styled.button``;
const MobileNavList = styled.ul``;
const MobileNavItem = styled.li``;
const MobileNavLink = styled(Link)``;
const MobileSubMenu = styled.ul``;
const MobileSubMenuItem = styled.li``;
const MobileSubMenuLink = styled(Link)``;
const ExpandButton = styled.button``;
const UserSection = styled.div``;
const MobileNavTitle = styled.h2``;
const UserGreeting = styled.p``;
const UserName = styled.p``;
const AccountLink = styled(Link)``;
const LoginButton = styled(Link)``;
const FooterSection = styled.div``;
const FooterLinksGrid = styled.div``;
const FooterLink = styled(Link)``;

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

const MobileNavigation = ({ isOpen, onClose, items }: MobileNavigationProps) => {
  const { isAuthenticated, customer } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="relative z-50 lg:hidden">
        {/* Overlay com animação */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MobileNavOverlay 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={handleOverlayClick}
            aria-label="Fechar menu"
          />
        </Transition.Child>
        
        {/* Menu Container com animação de slide */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <MobileNavContainer className="pointer-events-auto w-screen max-w-sm bg-dark-900 shadow-2xl">
        <MobileNavHeader className="flex items-center justify-between p-4 border-b border-dark-800">
          <MobileNavTitle className="text-lg font-semibold text-white">Menu</MobileNavTitle>
          <CloseButton
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-800 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-300" />
          </CloseButton>
        </MobileNavHeader>

        {/* User Section */}
        {isAuthenticated ? (
          <UserSection className="p-4 border-b border-dark-800">
            <UserGreeting className="text-sm text-gray-400">Olá,</UserGreeting>
            <UserName className="text-lg font-medium text-white">{customer?.name?.split(' ')[0]}</UserName>
            <AccountLink 
              href="/conta" 
              className="text-primary-500 text-sm hover:text-primary-400 transition-colors"
              onClick={handleClose}
            >
              Minha Conta →
            </AccountLink>
          </UserSection>
        ) : (
          <UserSection className="p-4 border-b border-dark-800">
            <LoginButton 
              href="/auth" 
              className="block w-full bg-primary-500 text-white text-center py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              onClick={handleClose}
            >
              Entrar / Cadastrar
            </LoginButton>
          </UserSection>
        )}

        {/* Navigation Items */}
        <MobileNavList className="py-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          {items.map((item, index) => (
            <MobileNavItem 
              key={item.href}
              className="transform transition-all duration-300"
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
              }}
            >
              <div className="flex items-center justify-between">
                <MobileNavLink
                  href={item.href}
                  className="flex-1 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-800 transition-colors"
                  onClick={handleClose}
                >
                  {item.label}
                </MobileNavLink>
                {item.children && (
                  <ExpandButton
                    onClick={() => toggleExpanded(item.label)}
                    className="px-4 py-3 text-gray-400 hover:text-white"
                    aria-label={expandedItems.includes(item.label) ? 'Recolher' : 'Expandir'}
                  >
                    {expandedItems.includes(item.label) ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </ExpandButton>
                )}
              </div>
              
              {item.children && (
                <Transition
                  show={expandedItems.includes(item.label)}
                  enter="transition-all duration-200 ease-out"
                  enterFrom="opacity-0 max-h-0"
                  enterTo="opacity-100 max-h-96"
                  leave="transition-all duration-200 ease-out"
                  leaveFrom="opacity-100 max-h-96"
                  leaveTo="opacity-0 max-h-0"
                >
                  <MobileSubMenu className="bg-dark-800 overflow-hidden">
                  {item.children.map((child) => (
                    <MobileSubMenuItem key={child.href}>
                      <MobileSubMenuLink
                        href={child.href}
                        className="block px-8 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-700 transition-all hover:pl-10 relative group"
                        onClick={handleClose}
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {child.label}
                      </MobileSubMenuLink>
                    </MobileSubMenuItem>
                  ))}
                  </MobileSubMenu>
                </Transition>
              )}
            </MobileNavItem>
          ))}
        </MobileNavList>

        {/* Footer Links */}
        <FooterSection className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800">
          <FooterLinksGrid className="grid grid-cols-2 gap-2 text-sm">
            <FooterLink 
              href="/politica-de-privacidade" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
              onClick={handleClose}
            >
              Privacidade
            </FooterLink>
            <FooterLink 
              href="/termos-de-uso" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
              onClick={handleClose}
            >
              Termos de Uso
            </FooterLink>
          </FooterLinksGrid>
        </FooterSection>
                </MobileNavContainer>
              </Transition.Child>
            </div>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
};

export default MobileNavigation;