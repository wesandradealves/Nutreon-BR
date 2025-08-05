import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';
import { CartItem } from '@prisma/client';

export class AddToCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(params: {
    cartId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    name?: string;
    image?: string;
    price?: number;
  }): Promise<CartItem> {
    // Validações
    if (params.quantity <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    // Adiciona item ao carrinho (o repositório já trata duplicatas)
    const cartItem = await this.cartRepository.addItem(params.cartId, {
      productId: params.productId,
      variantId: params.variantId,
      quantity: params.quantity,
      name: params.name || 'Produto',
      image: params.image || '',
      price: params.price || 0,
    });

    return cartItem;
  }
}