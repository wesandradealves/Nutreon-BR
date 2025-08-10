'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, ArrowLeft, Truck } from 'lucide-react';
import { Breadcrumb, type BreadcrumbItemType } from '@/components/molecules/Breadcrumb';
import { ProductCard } from '@/components/molecules/ProductCard';
import { BuyButton } from '@/components/atoms/BuyButton';
import { QuantitySelector } from '@/components/atoms/QuantitySelector';
import { useCart } from '@/hooks/useCart';
import { useFavoritesContext } from '@/context/favorites';
import { useApiRequest } from '@/hooks/useApiRequest';
import { useMetadata } from '@/hooks/useMetadata';
import { 
  getProductName, 
  getProductPrice, 
  getProductImage,
  getProductDescription,
  getProductStock,
  getProductPromotionalPrice,
  getProductRegularPrice
} from '@/utils/product-helpers';
import { formatCurrency } from '@/utils/formatters';
import type { NuvemshopProduct, NuvemshopCategory } from '@/types';
import {
  PageContainer,
  ProductContainer,
  BackButton,
  ProductContent,
  ProductGrid,
  ImageSection,
  MainImageWrapper,
  MainImage,
  ThumbnailList,
  ThumbnailItem,
  ThumbnailImage,
  InfoSection,
  ProductTitle,
  ProductCode,
  StockInfo,
  PriceContainer,
  OldPrice,
  CurrentPrice,
  DiscountBadge,
  QuantitySection,
  ActionsContainer,
  FavoriteButton,
  ShippingCalculator,
  ShippingTitle,
  ShippingForm,
  ShippingInput,
  ShippingButton,
  ShippingResults,
  ShippingOption,
  ShippingOptionWrapper,
  ShippingOptionName,
  ShippingDays,
  ShippingPrice,
  TabContainer,
  TabList,
  TabButton,
  TabContent,
  DescriptionContent,
  DetailsContent,
  DetailRow,
  DetailLabel,
  DetailValue,
  RelatedSection,
  RelatedTitle,
  RelatedGrid,
  LoadingContainer,
  LoadingSkeleton,
  NotFoundContainer,
  NotFoundTitle,
  OldPriceWrapper
} from './styles';

interface ShippingRate {
  name: string;
  price: number;
  days: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const handle = params?.handle as string;
  
  const { request: requestProduct } = useApiRequest<{ data: NuvemshopProduct }>();
  const { request: requestRelated } = useApiRequest<{ data: NuvemshopProduct[] }>();
  const { request: requestCategories } = useApiRequest<{ data: NuvemshopCategory[] }>();
  const { addToCart, getProductQuantity, updateQuantity, cart } = useCart();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  
  const [product, setProduct] = useState<NuvemshopProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<NuvemshopProduct[]>([]);
  const [categories, setCategories] = useState<NuvemshopCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(0);
  // Sincronizar quantidade com o carrinho
  const cartQuantity = product ? getProductQuantity(product.id.toString()) : 0;
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  
  // Atualizar quantidade quando o carrinho ou produto mudar
  useEffect(() => {
    if (product) {
      const newQuantity = getProductQuantity(product.id.toString());
      setQuantity(newQuantity || 1);
    }
  }, [product, getProductQuantity, cartQuantity]);
  const [cep, setCep] = useState('');
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const loadData = useCallback(async () => {
    if (!handle) return;
    
    setLoading(true);
    try {
      const [productResponse, relatedResponse, categoriesResponse] = await Promise.all([
        requestProduct(`/api/products/${handle}`),
        requestRelated('/api/products?per_page=4'),
        requestCategories('/api/categories')
      ]);
      
      if (productResponse.success && productResponse.data?.data) {
        setProduct(productResponse.data.data);
      }
      
      if (relatedResponse.success && relatedResponse.data?.data) {
        setRelatedProducts(relatedResponse.data.data);
      }
      
      if (categoriesResponse.success && categoriesResponse.data?.data) {
        setCategories(categoriesResponse.data.data);
      }
    } finally {
      setLoading(false);
    }
  }, [handle, requestProduct, requestRelated, requestCategories]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const productName = useMemo(() => 
    product ? getProductName(product.name) : '',
    [product]
  );
  
  const productPrice = useMemo(() => 
    product ? getProductPrice(product) : 0,
    [product]
  );
  
  const regularPrice = useMemo(() => 
    product ? getProductRegularPrice(product) : 0,
    [product]
  );
  
  const promotionalPrice = useMemo(() => 
    product ? getProductPromotionalPrice(product) : null,
    [product]
  );
  
  const productImage = useMemo(() => 
    product ? getProductImage(product) : '',
    [product]
  );
  
  const stock = useMemo(() => 
    product ? getProductStock(product) : 0,
    [product]
  );
  
  const description = useMemo(() => 
    product ? getProductDescription(product.description) : '',
    [product]
  );

  // Configurar metadata da página com informações do produto
  useMetadata({
    title: productName ? `${productName} - Nutreon` : 'Nutreon - Nutrindo Saúde',
    description: description || `Compre ${productName} com frete grátis acima de R$ 200. Produtos nutritivos e saudáveis na Nutreon.`,
    keywords: productName ? `${productName}, refeições congeladas, comida saudável, nutrição, Nutreon` : 'Nutreon, nutrição, saúde',
    ogTitle: productName || 'Nutreon',
    ogImage: productImage || '/img/logo.PNG'
  });

  const handleQuantityChange = useCallback(async (newQuantity: number) => {
    setQuantity(newQuantity);
    
    // Se o produto já está no carrinho, atualiza a quantidade no carrinho
    if (product && cartQuantity > 0 && cart?.items) {
      const cartItem = cart.items.find(item => item.productId === product.id.toString());
      if (cartItem) {
        setIsAddingToCart(true);
        try {
          await updateQuantity(cartItem.id, newQuantity);
        } finally {
          setIsAddingToCart(false);
        }
      }
    }
  }, [product, cartQuantity, cart?.items, updateQuantity]);

  const handleAddToCart = useCallback(async () => {
    if (!product || stock === 0) return;
    
    setIsAddingToCart(true);
    try {
      const productIdStr = product.id.toString();
      const variantId = product.variants?.[0]?.id?.toString();
      await addToCart(productIdStr, variantId, quantity);
      setQuantity(1);
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, stock, quantity, addToCart]);

  const handleToggleFavorite = useCallback(async () => {
    if (!product) return;
    
    setIsFavoriteLoading(true);
    try {
      await toggleFavorite(product.id.toString());
    } finally {
      setIsFavoriteLoading(false);
    }
  }, [product, toggleFavorite]);

  const handleBackToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSelectImage = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value.replace(/\D/g, ''));
  }, []);

  const calculateShipping = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || cep.length < 8 || !product) return;
    
    setLoadingShipping(true);
    try {
      const response = await fetch('/api/cart/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep, items: [{ productId: product.id, quantity }] })
      });
      const data = await response.json();
      setShippingRates([
        { name: 'Sedex', price: data.data.total, days: '3-5 dias úteis' },
        { name: 'PAC', price: data.data.total * 0.8, days: '5-8 dias úteis' }
      ]);
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
    } finally {
      setLoadingShipping(false);
    }
  }, [cep, product, quantity]);

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItemType[] = [
      { label: 'Início', href: '/' },
      { label: 'Produtos', href: '/produtos' }
    ];
    
    if (product && product.categories && product.categories.length > 0) {
      const categoryId = product.categories[0];
      const categoryData = categories.find(cat => cat.id === categoryId);
      if (categoryData) {
        const categoryName = typeof categoryData.name === 'string' 
          ? categoryData.name 
          : categoryData.name?.pt || 'Categoria';
        items.push({ label: categoryName, href: `/categoria/${categoryId}` });
      }
    }
    
    if (product) {
      items.push({ label: productName });
    }
    
    return items;
  }, [product, productName, categories]);

  const isFavorited = useMemo(() => 
    product ? isFavorite(product.id.toString()) : false,
    [product, isFavorite]
  );

  const discountPercentage = useMemo(() => {
    if (!promotionalPrice || !regularPrice) return 0;
    if (promotionalPrice >= regularPrice) return 0;
    return Math.round((1 - promotionalPrice / regularPrice) * 100);
  }, [regularPrice, promotionalPrice]);

  if (loading) {
    return (
      <PageContainer className="min-h-screen bg-gray-50">
        <LoadingContainer className="container mx-auto px-4 py-8">
          <LoadingSkeleton className="animate-pulse">
            <LoadingSkeleton className="h-96 bg-gray-200 rounded-lg mb-4" />
            <LoadingSkeleton className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
            <LoadingSkeleton className="h-6 bg-gray-200 rounded w-1/2" />
          </LoadingSkeleton>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer className="min-h-screen bg-gray-50">
        <NotFoundContainer className="container mx-auto px-4 py-8 text-center">
          <NotFoundTitle className="text-2xl font-bold mb-4">Produto não encontrado</NotFoundTitle>
          <BuyButton onClick={handleBackToHome} loading={false}>
            Voltar ao início
          </BuyButton>
        </NotFoundContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <ProductContainer className="container mx-auto px-4 py-8">
        <BackButton 
          onClick={handleGoBack}
          className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </BackButton>

        <ProductContent className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <ProductGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ImageSection>
              <MainImageWrapper className="relative">
                <MainImage 
                  src={product.images?.[selectedImage]?.src || productImage}
                  alt={productName}
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg mb-4"
                />
              </MainImageWrapper>
              
              {product.images && product.images.length > 1 && (
                <ThumbnailList className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <ThumbnailItem
                      key={image.id}
                      onClick={() => handleSelectImage(index)}
                      className={`cursor-pointer rounded border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ThumbnailImage
                        src={image.src}
                        alt={`${productName} ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-auto"
                      />
                    </ThumbnailItem>
                  ))}
                </ThumbnailList>
              )}
            </ImageSection>

            <InfoSection>
              <ProductTitle className="text-3xl font-bold text-gray-900 mb-2">
                {productName}
              </ProductTitle>
              
              <ProductCode className="text-sm text-gray-500 mb-4">
                SKU: {product.variants?.[0]?.sku || product.id}
              </ProductCode>

              <StockInfo className={`text-sm mb-4 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock > 0 ? `${stock} unidades disponíveis` : 'Produto indisponível'}
              </StockInfo>

              <PriceContainer className="mb-6">
                {promotionalPrice && discountPercentage > 0 && (
                  <>
                    <DiscountBadge className="inline-block bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold mb-2">
                      {discountPercentage}% OFF
                    </DiscountBadge>
                    <OldPriceWrapper>
                      <OldPrice className="text-gray-400 line-through text-lg">
                        {formatCurrency(regularPrice)}
                      </OldPrice>
                    </OldPriceWrapper>
                  </>
                )}
                <CurrentPrice className="text-3xl font-bold text-primary-500">
                  {formatCurrency(productPrice)}
                </CurrentPrice>
              </PriceContainer>

              <QuantitySection className="flex items-center gap-4 mb-6">
                <QuantitySelector
                  value={cartQuantity > 0 ? cartQuantity : quantity}
                  onChange={handleQuantityChange}
                  max={stock}
                />

                <FavoriteButton
                  onClick={handleToggleFavorite}
                  disabled={isFavoriteLoading}
                  className={`p-3 rounded-lg border transition-all ${
                    isFavorited 
                      ? 'bg-red-50 border-red-500 text-red-500' 
                      : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
                </FavoriteButton>
              </QuantitySection>

              <ActionsContainer className="mb-8">
                <BuyButton
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  loading={isAddingToCart}
                >
                  Adicionar ao carrinho
                </BuyButton>
              </ActionsContainer>

              <ShippingCalculator className="border-t pt-6">
                <ShippingTitle className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Truck size={20} />
                  Calcular Frete
                </ShippingTitle>
                <ShippingForm onSubmit={calculateShipping} className="flex gap-2">
                  <ShippingInput
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={handleCepChange}
                    maxLength={8}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                  <ShippingButton 
                    type="submit" 
                    disabled={loadingShipping}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {loadingShipping ? 'Calculando...' : 'Calcular'}
                  </ShippingButton>
                </ShippingForm>
                
                {shippingRates.length > 0 && (
                  <ShippingResults className="mt-4 space-y-2">
                    {shippingRates.map((rate, index) => (
                      <ShippingOption 
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <ShippingOptionWrapper className="flex items-center gap-2">
                          <ShippingOptionName className="font-semibold">{rate.name}</ShippingOptionName>
                          <ShippingDays className="text-sm text-gray-500">{rate.days}</ShippingDays>
                        </ShippingOptionWrapper>
                        <ShippingPrice className="font-semibold">{formatCurrency(rate.price)}</ShippingPrice>
                      </ShippingOption>
                    ))}
                  </ShippingResults>
                )}
              </ShippingCalculator>
            </InfoSection>
          </ProductGrid>

          <TabContainer className="mt-12 border-t pt-8">
            <TabList className="flex gap-4 border-b mb-6">
              <TabButton
                onClick={() => setActiveTab('description')}
                className={`pb-3 px-1 font-semibold transition-colors ${
                  activeTab === 'description' 
                    ? 'text-primary-500 border-b-2 border-primary-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Descrição
              </TabButton>
              <TabButton
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-1 font-semibold transition-colors ${
                  activeTab === 'details' 
                    ? 'text-primary-500 border-b-2 border-primary-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Detalhes
              </TabButton>
            </TabList>
            
            <TabContent>
              {activeTab === 'description' && (
                <DescriptionContent 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: description || 'Sem descrição disponível.' }}
                />
              )}
              
              {activeTab === 'details' && (
                <DetailsContent className="space-y-2">
                  <DetailRow>
                    <DetailLabel>SKU:</DetailLabel>
                    <DetailValue>{product.variants?.[0]?.sku || product.id}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Peso:</DetailLabel>
                    <DetailValue>{product.variants?.[0]?.weight || 'Não informado'}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Dimensões:</DetailLabel>
                    <DetailValue>
                      {product.variants?.[0]?.width && product.variants?.[0]?.height && product.variants?.[0]?.depth
                        ? `${product.variants[0].width} x ${product.variants[0].height} x ${product.variants[0].depth} cm`
                        : 'Não informado'}
                    </DetailValue>
                  </DetailRow>
                </DetailsContent>
              )}
            </TabContent>
          </TabContainer>
        </ProductContent>

        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedSection className="mt-12">
            <RelatedTitle className="text-2xl font-bold mb-6">
              Produtos Relacionados
            </RelatedTitle>
            <RelatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => {
                const category = categories.find(cat => 
                  relatedProduct.categories?.includes(cat.id)
                );
                const categoryName = category 
                  ? (typeof category.name === 'string' ? category.name : category.name?.pt)
                  : undefined;
                
                return (
                  <ProductCard 
                    key={relatedProduct.id} 
                    product={relatedProduct}
                    categoryName={categoryName}
                  />
                );
              })}
            </RelatedGrid>
          </RelatedSection>
        )}
      </ProductContainer>
    </PageContainer>
  );
}