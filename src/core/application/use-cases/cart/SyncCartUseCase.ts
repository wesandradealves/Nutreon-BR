import { ICartRepository } from '@/core/domain/repositories/cart.repository.interface';

export class SyncCartUseCase {
  constructor(
    private cartRepository: ICartRepository
  ) {}

  async execute(params: {
    sessionId: string;
    customerId: string;
  }): Promise<void> {
    // Busca carrinho da sessão (não logado)
    const sessionCart = await this.cartRepository.findBySessionId(params.sessionId);
    if (!sessionCart) {
      return; // Nada para sincronizar
    }
    
    // Busca carrinho com itens
    const sessionCartWithItems = await this.cartRepository.getCartWithItems(sessionCart.id);
    if (!sessionCartWithItems || sessionCartWithItems.items.length === 0) {
      return; // Carrinho vazio
    }

    // Busca ou cria carrinho do cliente
    const customerCart = await this.cartRepository.findByCustomerId(params.customerId);
    
    if (!customerCart) {
      // Se não tem carrinho do cliente, apenas atualiza o carrinho da sessão
      await this.cartRepository.update(sessionCart.id, {
        customerId: params.customerId,
        sessionId: null, // Remove sessionId pois agora está vinculado ao cliente
      });
      return;
    }

    // Adiciona cada item do carrinho da sessão ao carrinho do cliente
    for (const item of sessionCartWithItems.items) {
      await this.cartRepository.addItem(customerCart.id, {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        name: ('name' in item ? item.name : null) || 'Produto',
        image: ('image' in item ? item.image : null) || '',
        price: ('price' in item && item.price ? Number(item.price) : 0),
      });
    }

    // Remove o carrinho da sessão após sincronizar
    await this.cartRepository.delete(sessionCart.id);
  }
}