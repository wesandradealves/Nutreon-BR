'use client';

import { useCallback, useMemo } from 'react';
import { formatCurrency } from '@/utils/formatters';
import { getProductName, getProductPrice, getProductImage } from '@/utils/product-helpers';
import type { NuvemshopProduct } from '@/types';
import {
  CardContainer,
  ImageWrapper,
  ProductImage,
  InfoWrapper,
  ProductName,
  ProductPrice
} from './styles';

interface ProductCardCompactProps {
  product: NuvemshopProduct;
  onClick?: () => void;
}

export function ProductCardCompact({ product, onClick }: ProductCardCompactProps) {
  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  const productName = useMemo(() => getProductName(product.name), [product.name]);
  const productPrice = useMemo(() => getProductPrice(product), [product]);
  const productImage = useMemo(() => getProductImage(product), [product]);
  const formattedPrice = useMemo(() => formatCurrency(productPrice), [productPrice]);

  return (
    <CardContainer 
      className="flex items-center gap-4 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <ImageWrapper className="flex-shrink-0">
        <ProductImage
          src={productImage}
          alt={productName}
          className="w-16 h-16 object-cover rounded"
        />
      </ImageWrapper>
      
      <InfoWrapper className="flex-1 min-w-0">
        <ProductName className="text-white font-medium truncate">
          {productName}
        </ProductName>
        <ProductPrice className="text-primary-500 font-bold">
          {formattedPrice}
        </ProductPrice>
      </InfoWrapper>
    </CardContainer>
  );
}

export default ProductCardCompact;