import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';
import { cookies } from 'next/headers';
import { nuvemshopClient } from '@/lib/nuvemshop-client';
import type { NuvemshopProduct } from '@/types/nuvemshop.types';
import { COOKIES, IMAGES } from '@/utils/constants';

// GET /api/cart - Obter carrinho
export async function GET() {
  try {
    // Tenta obter customerId do token JWT
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.AUTH_TOKEN)?.value;
    let customerId: string | null = null;

    if (token) {
      try {
        const payload = await container.tokenService.verifyToken(token);
        if (payload) {
          customerId = payload.customerId;
        }
      } catch {
        // Token inválido, continua sem customerId
      }
    }

    // Obtém sessionId apenas se não estiver autenticado
    let sessionId: string | undefined;
    if (!customerId) {
      sessionId = cookieStore.get(COOKIES.CART_SESSION)?.value;
      if (!sessionId) {
        // Cria novo sessionId apenas se não estiver logado
        sessionId = crypto.randomUUID();
      }
    }

    // Busca ou cria carrinho
    console.log('[GET /api/cart] Buscando carrinho para:', { customerId, sessionId });
    const cart = await container.getOrCreateCartUseCase.execute({
      customerId,
      sessionId,
    });
    console.log('[GET /api/cart] Carrinho encontrado/criado:', cart.id, 'customerId:', cart.customerId);

    // Se criou novo sessionId E não está autenticado, salva no cookie
    if (sessionId && !customerId && !cookieStore.get(COOKIES.CART_SESSION)?.value) {
      cookieStore.set(COOKIES.CART_SESSION, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      });
    }

    // Busca carrinho com itens
    const cartWithItems = await container.getCartUseCase.execute(cart.id);

    // Enriquecer com dados dos produtos da Nuvemshop
    if (cartWithItems && cartWithItems.items.length > 0) {
      // Buscar dados dos produtos
      const productIds = cartWithItems.items.map((item) => item.productId);
      const uniqueProductIds = [...new Set(productIds)];
      
      try {
        // Buscar produtos da Nuvemshop
        const productsPromises = uniqueProductIds.map(id => 
          nuvemshopClient.get<NuvemshopProduct>(`/products/${id}`)
        );
        const products = await Promise.all(productsPromises);
        
        // Criar mapa de produtos para acesso rápido
        const productsMap = new Map(products.map(p => [p.id.toString(), p]));
        
        // Enriquecer itens do carrinho com dados dos produtos
        const enrichedItems = cartWithItems.items.map((item) => {
          const product = productsMap.get(item.productId);
          
          if (product) {
            // Encontrar a variante correta ou usar a primeira
            const variant = item.variantId 
              ? product.variants?.find(v => v.id.toString() === item.variantId)
              : product.variants?.[0];
            
            return {
              ...item,
              name: product.name?.pt || product.name?.es || 'Produto sem nome',
              image: product.images?.[0]?.src || IMAGES.PRODUCT_PLACEHOLDER,
              price: parseFloat(variant?.price || '0'),
              stock: variant?.stock || 0,
            };
          }
          
          // Se não encontrar o produto, retorna com dados vazios
          return {
            ...item,
            name: 'Produto não encontrado',
            image: IMAGES.PRODUCT_PLACEHOLDER,
            price: 0,
            stock: 0,
          };
        });
        
        // Calcular subtotal
        const subtotal = enrichedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        // Retornar carrinho enriquecido
        return successResponse({
          ...cartWithItems,
          items: enrichedItems,
          subtotal,
          shipping: 0,
          discount: 0,
          total: subtotal,
        });
      } catch (error) {
        console.error('Erro ao buscar produtos da Nuvemshop:', error);
        // Se falhar, retorna carrinho sem enriquecimento
        return successResponse(cartWithItems);
      }
    }

    return successResponse(cartWithItems);
  } catch (error) {
    return handleApiError(error, 'Erro ao buscar carrinho');
  }
}

// POST /api/cart - Adicionar item ao carrinho
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, variantId, quantity = 1 } = body;

    if (!productId) {
      return errorResponse('Product ID é obrigatório', 400);
    }

    if (quantity <= 0) {
      return errorResponse('Quantidade deve ser maior que zero', 400);
    }

    // Obtém o carrinho atual
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.AUTH_TOKEN)?.value;
    let customerId: string | null = null;

    if (token) {
      try {
        const payload = await container.tokenService.verifyToken(token);
        if (payload) {
          customerId = payload.customerId;
        }
      } catch {
        // Token inválido
      }
    }

    let sessionId = cookieStore.get(COOKIES.CART_SESSION)?.value;
    if (!sessionId && !customerId) {
      sessionId = crypto.randomUUID();
      cookieStore.set(COOKIES.CART_SESSION, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    // Busca ou cria carrinho
    const cart = await container.getOrCreateCartUseCase.execute({
      customerId,
      sessionId,
    });

    // Buscar dados do produto na Nuvemshop
    let productData = {
      name: 'Produto',
      image: IMAGES.PRODUCT_PLACEHOLDER as string,
      price: 0,
    };
    
    try {
      const product = await nuvemshopClient.get<NuvemshopProduct>(`/products/${productId}`);
      const variant = variantId 
        ? product.variants?.find(v => v.id.toString() === variantId)
        : product.variants?.[0];
      
      productData = {
        name: product.name?.pt || product.name?.es || 'Produto sem nome',
        image: product.images?.[0]?.src || (IMAGES.PRODUCT_PLACEHOLDER as string),
        price: parseFloat(variant?.price || '0'),
      };
    } catch (error) {
      console.error('Erro ao buscar produto na Nuvemshop:', error);
    }

    // Adiciona item com dados enriquecidos
    const cartItem = await container.addToCartUseCase.execute({
      cartId: cart.id,
      productId,
      variantId,
      quantity,
      name: productData.name,
      image: productData.image,
      price: productData.price,
    });

    return successResponse({ item: cartItem, message: 'Produto adicionado ao carrinho' });
  } catch (error) {
    return handleApiError(error, 'Erro ao adicionar produto ao carrinho');
  }
}

// DELETE /api/cart - Limpar carrinho
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.AUTH_TOKEN)?.value;
    let customerId: string | null = null;

    if (token) {
      try {
        const payload = await container.tokenService.verifyToken(token);
        if (payload) {
          customerId = payload.customerId;
        }
      } catch {
        // Token inválido
      }
    }

    const sessionId = cookieStore.get(COOKIES.CART_SESSION)?.value;

    // Busca carrinho
    let cart = null;
    if (customerId) {
      cart = await container.cartRepository.findByCustomerId(customerId);
    } else if (sessionId) {
      cart = await container.cartRepository.findBySessionId(sessionId);
    }

    if (!cart) {
      return errorResponse('Carrinho não encontrado', 404);
    }

    // Limpa itens e deleta carrinho
    await container.clearCartUseCase.execute(cart.id);
    
    // Remove cookie de sessão se não estiver autenticado
    if (!customerId && sessionId) {
      console.log('[DELETE /api/cart] Removendo cookie de sessão');
      const response = successResponse({ message: 'Carrinho limpo com sucesso' });
      response.cookies.delete(COOKIES.CART_SESSION);
      return response;
    }

    return successResponse({ message: 'Carrinho limpo com sucesso' });
  } catch (error) {
    return handleApiError(error, 'Erro ao limpar carrinho');
  }
}