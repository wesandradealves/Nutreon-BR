import { NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { authMiddleware } from '@/core/infrastructure/middleware/authMiddleware';
import { handleApiError, successResponse } from '@/lib/api-utils';

export async function GET(request: Request) {
  try {
    const authResult = await authMiddleware(request);
    if (!authResult.authenticated || !authResult.customerId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const favorites = await container.getFavoritesUseCase.execute(authResult.customerId);
    
    return successResponse(favorites, { message: 'Favoritos recuperados com sucesso' });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await authMiddleware(request);
    if (!authResult.authenticated || !authResult.customerId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const result = await container.toggleFavoriteUseCase.execute(
      authResult.customerId,
      productId
    );

    return successResponse(
      result,
      { message: result.added ? 'Produto adicionado aos favoritos' : 'Produto removido dos favoritos' }
    );
  } catch (error) {
    return handleApiError(error);
  }
}