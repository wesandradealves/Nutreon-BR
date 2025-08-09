'use client';

import { Fragment, useCallback, useMemo, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useFavoriteActions } from '@/hooks/useFavoriteActions';
import { formatCurrency } from '@/utils/formatters';
import { FavoriteToggle } from '@/components/atoms/FavoriteToggle';
import { QuantitySelector } from '@/components/atoms/QuantitySelector';
import { 
  DrawerOverlay, 
  DrawerContainer, 
  DrawerHeader, 
  DrawerTitle, 
  CloseButton,
  DrawerContent,
  EmptyCart,
  EmptyIcon,
  EmptyText,
  CartList,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  RemoveButton,
  CartFooter,
  SubtotalRow,
  ShippingRow,
  TotalRow,
  CheckoutButton,
  CartPageLink,
  RootWrapper,
  OverflowWrapper,
  AbsoluteWrapper,
  FlexWrapper,
  InnerContainer,
  ScreenReaderText,
  LoadingWrapper,
  LoadingText,
  ItemDetailsWrapper,
  ItemHeader,
  ItemSubPrice,
  ItemFooter,
  SubtotalLabel,
  SubtotalValue,
  ShippingLabel,
  ShippingValue,
  TotalLabel,
  TotalValue,
  ActionsWrapper
} from './styles';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, loading, updateQuantity, removeItem, subtotal, shipping, total } = useCart();
  const { isFavorite, handleToggleFavorite, loadingFavorites } = useFavoriteActions();

  const handleQuantityChange = useCallback(async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  }, [updateQuantity]);

  const handleRemove = useCallback(async (itemId: string) => {
    await removeItem(itemId);
  }, [removeItem]);

  const hasItems = useMemo(() => cart?.items && cart.items.length > 0, [cart]);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevenir scroll do body quando o drawer estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <RootWrapper className="relative z-50">
        {/* Overlay - Movido para fora do container que tem pointer-events-none */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DrawerOverlay 
            className="fixed inset-0 bg-black/50 cursor-pointer" 
            onClick={onClose}
            aria-label="Fechar carrinho"
          />
        </Transition.Child>

        <OverflowWrapper className="fixed inset-0 overflow-hidden pointer-events-none">
          <AbsoluteWrapper className="absolute inset-0 overflow-hidden">
            <FlexWrapper className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DrawerContainer className="pointer-events-auto w-screen max-w-md">
                  <InnerContainer className="flex h-full flex-col bg-white shadow-xl">
                    <DrawerHeader className="flex items-center justify-between px-4 py-6 sm:px-6">
                      <DrawerTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <ShoppingCart size={24} />
                        Meu Carrinho
                      </DrawerTitle>
                      <CloseButton
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <ScreenReaderText className="sr-only">Fechar carrinho</ScreenReaderText>
                        <X size={24} />
                      </CloseButton>
                    </DrawerHeader>

                    <DrawerContent className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {loading ? (
                        <LoadingWrapper className="flex items-center justify-center h-full">
                          <LoadingText className="text-gray-500">Carregando...</LoadingText>
                        </LoadingWrapper>
                      ) : hasItems ? (
                        <CartList className="divide-y divide-gray-200">
                          {cart!.items.map((item) => (
                            <CartItem key={item.id} className="flex py-6">
                              <ItemImage className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={item.image || '/images/product-placeholder.png'}
                                  alt={item.name}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-cover object-center"
                                />
                              </ItemImage>

                              <ItemInfo className="ml-4 flex flex-1 flex-col">
                                <ItemDetailsWrapper>
                                  <ItemHeader className="flex justify-between text-base font-medium text-gray-900">
                                    <ItemName>{item.name}</ItemName>
                                    <ItemPrice>{formatCurrency(item.price * item.quantity)}</ItemPrice>
                                  </ItemHeader>
                                  <ItemSubPrice className="mt-1 text-sm text-gray-500">
                                    {formatCurrency(item.price)} cada
                                  </ItemSubPrice>
                                </ItemDetailsWrapper>
                                <ItemFooter className="flex flex-1 items-end justify-between text-sm">
                                  <QuantitySelector
                                    value={item.quantity}
                                    onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                  />

                                  <ActionsWrapper className="flex items-center gap-2">
                                    <FavoriteToggle
                                      productId={item.productId}
                                      isFavorite={isFavorite(item.productId)}
                                      onToggle={handleToggleFavorite}
                                      disabled={loadingFavorites.includes(item.productId)}
                                    />
                                    <RemoveButton
                                      type="button"
                                      onClick={() => handleRemove(item.id)}
                                      className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                    >
                                      <Trash2 size={16} />
                                      Remover
                                    </RemoveButton>
                                  </ActionsWrapper>
                                </ItemFooter>
                              </ItemInfo>
                            </CartItem>
                          ))}
                        </CartList>
                      ) : (
                        <EmptyCart className="flex flex-col items-center justify-center h-full">
                          <EmptyIcon className="w-16 h-16 text-gray-300 mb-4">
                            <ShoppingCart size={64} />
                          </EmptyIcon>
                          <EmptyText className="text-gray-500 text-center">
                            Seu carrinho está vazio
                          </EmptyText>
                        </EmptyCart>
                      )}
                    </DrawerContent>

                    <CartFooter className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      {hasItems && (
                        <>
                          <SubtotalRow className="flex justify-between text-base font-medium text-gray-900">
                            <SubtotalLabel>Subtotal</SubtotalLabel>
                            <SubtotalValue>{formatCurrency(subtotal)}</SubtotalValue>
                          </SubtotalRow>
                          <ShippingRow className="flex justify-between text-sm text-gray-500 mt-2">
                            <ShippingLabel>Frete</ShippingLabel>
                            <ShippingValue>{shipping === 0 ? 'Grátis' : formatCurrency(shipping)}</ShippingValue>
                          </ShippingRow>
                          <TotalRow className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t">
                            <TotalLabel>Total</TotalLabel>
                            <TotalValue>{formatCurrency(total)}</TotalValue>
                          </TotalRow>
                          <ActionsWrapper className="mt-6 space-y-3">
                            <CheckoutButton
                              href="/checkout"
                              className="flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-600 transition-colors"
                              onClick={onClose}
                            >
                              Finalizar Compra
                            </CheckoutButton>
                            <CartPageLink
                              href="/carrinho"
                              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                              onClick={onClose}
                            >
                              Ver Carrinho Completo
                            </CartPageLink>
                          </ActionsWrapper>
                        </>
                      )}
                    </CartFooter>
                  </InnerContainer>
                </DrawerContainer>
              </Transition.Child>
            </FlexWrapper>
          </AbsoluteWrapper>
        </OverflowWrapper>
      </RootWrapper>
    </Transition.Root>
  );
}