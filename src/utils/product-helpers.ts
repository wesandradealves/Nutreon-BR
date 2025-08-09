import type { NuvemshopProduct } from '@/types';
import { IMAGES } from '@/utils/constants';

export const getProductName = (name: NuvemshopProduct['name']): string => {
  if (!name) return 'Produto sem nome';
  if (typeof name === 'string') return name;
  return name.pt || Object.values(name)[0] || 'Produto sem nome';
};

export const getProductPrice = (product: NuvemshopProduct): number => {
  const variant = product.variants?.[0];
  if (!variant) return 0;
  return Number(variant.promotional_price || variant.price || 0);
};

export const getProductRegularPrice = (product: NuvemshopProduct): number => {
  const variant = product.variants?.[0];
  if (!variant) return 0;
  return Number(variant.price || 0);
};

export const getProductPromotionalPrice = (product: NuvemshopProduct): number | undefined => {
  const variant = product.variants?.[0];
  if (!variant?.promotional_price) return undefined;
  return Number(variant.promotional_price);
};

export const getProductImage = (product: NuvemshopProduct): string => {
  return product.images?.[0]?.src || IMAGES.PRODUCT_PLACEHOLDER;
};

export const getProductStock = (product: NuvemshopProduct): number => {
  const variant = product.variants?.[0];
  if (!variant) return 0;
  const stock = variant.stock;
  return typeof stock === 'string' ? parseInt(stock) : (stock || 0);
};

export const getProductHandle = (handle?: NuvemshopProduct['handle']): string | undefined => {
  if (!handle) return undefined;
  if (typeof handle === 'string') return handle;
  return handle.pt || Object.values(handle)[0] || undefined;
};

export const isProductAvailable = (product: NuvemshopProduct): boolean => {
  return product.published === true && getProductStock(product) > 0;
};

export const getProductDescription = (description?: NuvemshopProduct['description']): string => {
  if (!description) return '';
  if (typeof description === 'string') return description;
  return description.pt || Object.values(description)[0] || '';
};