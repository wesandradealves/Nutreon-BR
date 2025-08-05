import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';
import { Cart } from '@prisma/client';

export class GetOrCreateCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(params: {
    customerId?: string | null;
    sessionId?: string | null;
  }): Promise<Cart> {
    let cart: Cart | null = null;

    // Prioriza busca por customerId se estiver logado
    if (params.customerId) {
      cart = await this.cartRepository.findByCustomerId(params.customerId);
    } else if (params.sessionId) {
      cart = await this.cartRepository.findBySessionId(params.sessionId);
    }

    // Se não encontrou carrinho, cria um novo
    if (!cart) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // Expira em 30 dias

      cart = await this.cartRepository.create({
        customerId: params.customerId,
        sessionId: params.sessionId,
        expiresAt,
      });
    }

    return cart;
  }
}