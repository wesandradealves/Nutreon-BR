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
    console.log('[GetOrCreateCartUseCase] Executando com params:', params);
    let cart: Cart | null = null;

    // Prioriza busca por customerId se estiver logado
    if (params.customerId) {
      console.log('[GetOrCreateCartUseCase] Buscando por customerId:', params.customerId);
      cart = await this.cartRepository.findByCustomerId(params.customerId);
      console.log('[GetOrCreateCartUseCase] Carrinho encontrado por customerId:', cart?.id);
    } else if (params.sessionId) {
      console.log('[GetOrCreateCartUseCase] Buscando por sessionId:', params.sessionId);
      cart = await this.cartRepository.findBySessionId(params.sessionId);
      console.log('[GetOrCreateCartUseCase] Carrinho encontrado por sessionId:', cart?.id);
    }

    // Se não encontrou carrinho, cria um novo
    if (!cart) {
      console.log('[GetOrCreateCartUseCase] Carrinho não encontrado, criando novo');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // Expira em 30 dias

      cart = await this.cartRepository.create({
        customerId: params.customerId,
        sessionId: params.sessionId,
        expiresAt,
      });
      console.log('[GetOrCreateCartUseCase] Novo carrinho criado:', cart.id, 'customerId:', cart.customerId);
    }

    return cart;
  }
}