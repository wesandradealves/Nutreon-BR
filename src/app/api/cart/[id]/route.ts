import { NextRequest } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/cart/:id - Atualizar quantidade do item
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;

    console.log('PATCH cart item:', { id, quantity });

    if (!id) {
      return errorResponse('ID do item é obrigatório', 400);
    }

    if (quantity === undefined || quantity === null) {
      return errorResponse('Quantidade é obrigatória', 400);
    }

    if (quantity < 0) {
      return errorResponse('Quantidade inválida', 400);
    }

    // Se quantidade for 0, remove o item
    if (quantity === 0) {
      await container.removeFromCartUseCase.execute(id);
      return successResponse({ message: 'Item removido do carrinho' });
    }

    // Atualiza quantidade
    const updatedItem = await container.updateCartItemUseCase.execute({
      itemId: id,
      quantity,
    });

    return successResponse({ item: updatedItem, message: 'Quantidade atualizada' });
  } catch (error) {
    return handleApiError(error, 'Erro ao atualizar item do carrinho');
  }
}

// DELETE /api/cart/:id - Remover item do carrinho
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    console.log('DELETE cart item:', { id });

    if (!id) {
      return errorResponse('ID do item é obrigatório', 400);
    }

    await container.removeFromCartUseCase.execute(id);

    return successResponse({ message: 'Item removido do carrinho' });
  } catch (error) {
    return handleApiError(error, 'Erro ao remover item do carrinho');
  }
}