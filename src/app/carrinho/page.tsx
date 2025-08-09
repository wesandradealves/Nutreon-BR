'use client';

import { useCallback } from 'react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useFavoriteActions } from '@/hooks/useFavoriteActions';
import { useMetadata } from '@/hooks/useMetadata';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'react-hot-toast';
import { IMAGES } from '@/utils/constants';
import { FavoriteToggle } from '@/components/atoms/FavoriteToggle';
import { QuantityControls } from '@/components/molecules/QuantityControls';
import {
  PageContainer,
  Container,
  Header,
  PageTitle,
  ClearButton,
  GridContainer,
  ProductsSection,
  ProductsCard,
  ProductsHeader,
  ProductsCount,
  ProductsList,
  ProductItem,
  ProductWrapper,
  ProductImageWrapper,
  ProductImage,
  ProductInfo,
  ProductHeader,
  ProductDetails,
  ProductName,
  ProductPrice,
  TotalPrice,
  TotalPriceText,
  ProductControls,
  RemoveButton,
  ActionsWrapper,
  SummarySection,
  SummaryCard,
  SummaryTitle,
  SummaryContent,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryDivider,
  SummaryTotal,
  FreeShippingText,
  ActionsSection,
  CheckoutButton,
  ContinueButton,
  ShippingInfo,
  ShippingTitle,
  ShippingText,
  EmptyContainer,
  FreeShippingLabel,
  TotalLabel,
  TotalValue,
  ShippingHighlight,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  ContinueShoppingButton,
  LoadingContainer,
  LoadingContent,
  LoadingSpinner,
  LoadingText
} from './styles';

export default function CartPage() {
  const { 
    cart, 
    loading, 
    itemCount, 
    subtotal, 
    shipping, 
    total,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();
  const { isFavorite, handleToggleFavorite, loadingFavorites } = useFavoriteActions();

  useMetadata({
    title: `Carrinho (${itemCount}) - Nutreon BR`,
    description: 'Seu carrinho de compras na Nutreon - Refeições congeladas saudáveis e nutritivas',
    ogTitle: `Carrinho - Nutreon BR`
  });

  const handleQuantityChange = useCallback(async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  }, [updateQuantity]);

  const handleRemove = useCallback(async (itemId: string) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  }, [removeItem]);

  const handleClearCart = useCallback(async () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      try {
        await clearCart();
        toast.success('Carrinho limpo com sucesso!');
      } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
      }
    }
  }, [clearCart]);

  if (loading) {
    return (
      <LoadingContainer className="min-h-screen flex items-center justify-center">
        <LoadingContent className="flex items-center gap-3">
          <LoadingSpinner className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          <LoadingText className="text-gray-600">Carregando carrinho...</LoadingText>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  if (!cart || itemCount === 0) {
    return (
      <EmptyContainer className="min-h-screen flex flex-col items-center justify-center px-4">
        <EmptyIcon className="text-gray-300 mb-4">
          <ShoppingCart size={64} />
        </EmptyIcon>
        <EmptyTitle className="text-2xl font-bold text-gray-900 mb-4">
          Seu carrinho está vazio
        </EmptyTitle>
        <EmptyText className="text-gray-600 mb-8 text-center">
          Adicione produtos deliciosos e nutritivos para continuar
        </EmptyText>
        <ContinueShoppingButton 
          href="/" 
          className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          Continuar comprando
        </ContinueShoppingButton>
      </EmptyContainer>
    );
  }

  return (
    <PageContainer className="min-h-screen bg-gray-50 py-8">
      <Container className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Header className="flex items-center justify-between mb-8">
          <PageTitle className="text-3xl font-bold text-gray-900">
            Meu Carrinho
          </PageTitle>
          <ClearButton
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={20} />
            Limpar carrinho
          </ClearButton>
        </Header>
        
        <GridContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <ProductsSection className="lg:col-span-2">
            <ProductsCard className="bg-white rounded-lg shadow">
              <ProductsHeader className="p-4 border-b">
                <ProductsCount className="text-gray-600">
                  {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
                </ProductsCount>
              </ProductsHeader>
              
              <ProductsList className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <ProductItem key={item.id} className="p-6">
                    <ProductWrapper className="flex gap-4">
                      {/* Imagem */}
                      <ProductImageWrapper className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                        <ProductImage
                          src={item.image || IMAGES.PRODUCT_PLACEHOLDER}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </ProductImageWrapper>
                      
                      {/* Informações */}
                      <ProductInfo className="flex-1">
                        <ProductHeader className="flex justify-between">
                          <ProductDetails>
                            <ProductName className="text-lg font-medium text-gray-900">
                              {item.name}
                            </ProductName>
                            <ProductPrice className="text-sm text-gray-500 mt-1">
                              {formatCurrency(item.price)} cada
                            </ProductPrice>
                          </ProductDetails>
                          
                          {/* Preço total do item */}
                          <TotalPrice className="text-right">
                            <TotalPriceText className="text-lg font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </TotalPriceText>
                          </TotalPrice>
                        </ProductHeader>
                        
                        {/* Controles */}
                        <ProductControls className="flex items-center justify-between mt-4">
                          {/* Quantidade */}
                          <QuantityControls
                            quantity={item.quantity}
                            onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                          />
                          
                          {/* Ações */}
                          <ActionsWrapper className="flex items-center gap-2">
                            <FavoriteToggle
                              productId={item.productId}
                              isFavorite={isFavorite(item.productId)}
                              onToggle={handleToggleFavorite}
                              disabled={loadingFavorites.includes(item.productId)}
                            />
                            
                            {/* Remover */}
                            <RemoveButton
                              onClick={() => handleRemove(item.id)}
                              className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                            >
                              <X size={20} />
                              Remover
                            </RemoveButton>
                          </ActionsWrapper>
                        </ProductControls>
                      </ProductInfo>
                    </ProductWrapper>
                  </ProductItem>
                ))}
              </ProductsList>
            </ProductsCard>
          </ProductsSection>
          
          {/* Resumo do Pedido */}
          <SummarySection className="lg:col-span-1">
            <SummaryCard className="bg-white rounded-lg shadow p-6 sticky top-4">
              <SummaryTitle className="text-xl font-bold text-gray-900 mb-4">
                Resumo do Pedido
              </SummaryTitle>
              
              <SummaryContent className="space-y-3">
                <SummaryRow className="flex justify-between text-gray-600">
                  <SummaryLabel>Subtotal</SummaryLabel>
                  <SummaryValue>{formatCurrency(subtotal)}</SummaryValue>
                </SummaryRow>
                
                <SummaryRow className="flex justify-between text-gray-600">
                  <SummaryLabel>Frete</SummaryLabel>
                  <SummaryValue>
                    {shipping === 0 ? (
                      <FreeShippingLabel className="text-green-600 font-medium">Grátis</FreeShippingLabel>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </SummaryValue>
                </SummaryRow>
                
                {shipping === 0 && (
                  <FreeShippingText className="text-xs text-green-600 -mt-2">
                    Parabéns! Você ganhou frete grátis!
                  </FreeShippingText>
                )}
                
                <SummaryDivider className="pt-3 border-t">
                  <SummaryTotal className="flex justify-between text-lg font-bold text-gray-900">
                    <TotalLabel>Total</TotalLabel>
                    <TotalValue>{formatCurrency(total)}</TotalValue>
                  </SummaryTotal>
                </SummaryDivider>
              </SummaryContent>
              
              <ActionsSection className="mt-6 space-y-3">
                <CheckoutButton
                  href="/checkout"
                  className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium text-center block"
                >
                  Finalizar Compra
                </CheckoutButton>
                
                <ContinueButton
                  href="/"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block"
                >
                  Continuar Comprando
                </ContinueButton>
              </ActionsSection>
              
              {/* Informação de Frete */}
              {subtotal < 200 && (
                <ShippingInfo className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <ShippingTitle className="text-sm text-blue-800">
                    <ShippingHighlight>Frete Grátis</ShippingHighlight> para compras acima de {formatCurrency(200)}
                  </ShippingTitle>
                  <ShippingText className="text-xs text-blue-700 mt-1">
                    Faltam {formatCurrency(200 - subtotal)} para você ganhar frete grátis!
                  </ShippingText>
                </ShippingInfo>
              )}
            </SummaryCard>
          </SummarySection>
        </GridContainer>
      </Container>
    </PageContainer>
  );
}