'use client';

import { useState, useCallback, useMemo } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useFavoritesContext } from '@/context/favorites';
import { QuantitySelector } from '@/components/atoms/QuantitySelector';
import { BuyButton } from '@/components/atoms/BuyButton';
import { formatCurrency } from '@/utils/formatters';
import { IMAGES } from '@/utils/constants';
import {
  ProductCardContainer,
  ProductImageWrapper,
  ProductImage,
  FavoriteButton,
  BadgeContainer,
  Badge,
  ProductInfo,
  ProductCategory,
  ProductName,
  PriceContainer,
  DiscountBadge,
  OldPrice,
  CurrentPrice,
  QuantityRow,
  QuantityWrapper,
  CartIndicator,
  OutOfStockOverlay
} from './styles';
import type { NuvemshopProduct } from '@/types';

interface ProductCardProps {
  product: NuvemshopProduct;
  categoryName?: string;
}


export function ProductCard({ product, categoryName }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, getProductQuantity, updateQuantity, cart } = useCart();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  
  // Quantidade para adicionar
  const [quantity, setQuantity] = useState(1);
  
  // Quantidade atual no carrinho
  const cartQuantity = getProductQuantity(product.id.toString());

  const productName = useMemo(() => 
    product.name.pt || Object.values(product.name).find(Boolean) || 'Produto sem nome',
    [product.name]
  );
  
  const imageUrl = product.images?.[0]?.src || IMAGES.PRODUCT_PLACEHOLDER;
  const variant = product.variants?.[0];
  
  const { price, currentPrice, hasDiscount, discountPercentage, inStock } = useMemo(() => {
    const price = parseFloat(variant?.price || '0');
    const promotionalPrice = variant?.promotional_price ? parseFloat(variant.promotional_price) : null;
    const currentPrice = promotionalPrice || price;
    const hasDiscount = promotionalPrice && promotionalPrice < price;
    const discountPercentage = hasDiscount ? Math.round(((price - promotionalPrice!) / price) * 100) : 0;
    const inStock = !variant?.stock || (typeof variant.stock === 'number' ? variant.stock > 0 : variant.stock !== '0');
    
    return { price, promotionalPrice, currentPrice, hasDiscount, discountPercentage, inStock };
  }, [variant]);


  const handleAddToCart = useCallback(async () => {
    if (!inStock) return;
    
    setIsLoading(true);
    try {
      const productIdStr = product.id.toString();
      const variantId = product.variants?.[0]?.id?.toString();
      
      // Se já está no carrinho, adiciona a quantidade atual ao carrinho existente
      if (cartQuantity > 0) {
        // Já está no carrinho, a quantidade já foi atualizada pelo handleQuantityChange
        // Apenas mostra feedback de sucesso
        const { toast } = await import('react-hot-toast');
        toast.success('Quantidade atualizada no carrinho!');
      } else {
        // Não está no carrinho, adiciona com a quantidade selecionada
        await addToCart(productIdStr, variantId, quantity);
        setQuantity(1); // Reset para 1 após adicionar
      }
    } finally {
      setIsLoading(false);
    }
  }, [inStock, addToCart, product.id, product.variants, quantity, cartQuantity]);

  const handleViewDetails = useCallback(() => {
    let slug = `produto-${product.id}`;
    if (product.handle) {
      slug = typeof product.handle === 'string' 
        ? product.handle 
        : product.handle.pt || slug;
    }
    router.push(`/produto/${slug}`);
  }, [product.id, product.handle, router]);

  const handleToggleFavorite = useCallback(async () => {
    setIsFavoriteLoading(true);
    try {
      await toggleFavorite(product.id.toString());
    } finally {
      setIsFavoriteLoading(false);
    }
  }, [toggleFavorite, product.id]);

  // Quando alterar quantidade, se produto já está no carrinho, atualiza diretamente
  const handleQuantityChange = useCallback(async (newQuantity: number) => {
    setQuantity(newQuantity);
    
    // Se o produto já está no carrinho, atualiza a quantidade no carrinho
    if (cartQuantity > 0 && cart?.items) {
      const cartItem = cart.items.find(item => item.productId === product.id.toString());
      if (cartItem) {
        setIsLoading(true);
        try {
          await updateQuantity(cartItem.id, newQuantity);
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [cartQuantity, cart?.items, product.id, updateQuantity]);

  return (
    <ProductCardContainer className="bg-white relative transition-all duration-300 border border-gray-200 hover:shadow-lg">
      {!inStock && (
        <OutOfStockOverlay className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-20">
          <div className="text-red-500 font-bold text-lg">Produto Indisponível</div>
        </OutOfStockOverlay>
      )}
      
      <ProductImageWrapper className="relative overflow-hidden">
        <FavoriteButton
          className={`absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:bg-gray-50 z-10 ${isFavoriteLoading ? 'opacity-50 cursor-wait' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite(product.id.toString()) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          disabled={isFavoriteLoading}
        >
          <Heart 
            size={20} 
            className={isFavorite(product.id.toString()) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </FavoriteButton>

        {hasDiscount && (
          <BadgeContainer className="absolute left-0 top-3">
            <Badge className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-r-full">
              {discountPercentage}% OFF
            </Badge>
          </BadgeContainer>
        )}

        <ProductImage 
          className="w-full h-full object-cover cursor-pointer"
          src={imageUrl} 
          alt={productName}
          onClick={handleViewDetails}
          onError={(e) => {
            e.currentTarget.src = IMAGES.PRODUCT_PLACEHOLDER;
          }}
        />
      </ProductImageWrapper>

      <ProductInfo className="p-4">
        {categoryName && (
          <ProductCategory className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            {categoryName}
          </ProductCategory>
        )}
        
        <ProductName 
          className="text-gray-800 text-base font-normal mb-4 min-h-[48px] cursor-pointer hover:text-cyan-500 transition-colors"
          onClick={handleViewDetails}
        >
          {productName}
        </ProductName>

        <QuantityRow className="flex items-center justify-between mb-4">
          <QuantityWrapper>
            <QuantitySelector 
              value={cartQuantity > 0 ? cartQuantity : quantity}
              onChange={handleQuantityChange}
              max={typeof variant?.stock === 'number' ? variant.stock : 99}
            />
            {cartQuantity > 0 && (
              <CartIndicator className="text-xs text-green-600 mt-1 block">
                {cartQuantity} no carrinho
              </CartIndicator>
            )}
          </QuantityWrapper>

          <PriceContainer className="text-right">
            {hasDiscount && (
              <>
                <DiscountBadge className="text-red-500 font-bold text-sm mb-1">
                  {discountPercentage}% OFF
                </DiscountBadge>
                <OldPrice className="text-gray-500 text-sm line-through">
                  de {formatCurrency(price)}
                </OldPrice>
              </>
            )}
            <CurrentPrice className="text-gray-800 font-bold text-xl">
              por {formatCurrency(currentPrice)}
            </CurrentPrice>
          </PriceContainer>
        </QuantityRow>

        <BuyButton 
          onClick={handleAddToCart}
          disabled={!inStock}
          loading={isLoading}
        >
          Eu Quero
        </BuyButton>
      </ProductInfo>
    </ProductCardContainer>
  );
}