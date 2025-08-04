import { NextResponse } from 'next/server';
import { container } from '@/core/infrastructure/container';
import { authMiddleware } from '@/core/infrastructure/middleware/authMiddleware';
import { handleApiError, successResponse } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const authResult = await authMiddleware(request);
    if (!authResult.authenticated || !authResult.customerId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { favorites } = await request.json();

    if (!Array.isArray(favorites)) {
      return NextResponse.json(
        { success: false, error: 'Favorites must be an array' },
        { status: 400 }
      );
    }

    await container.syncFavoritesUseCase.execute(authResult.customerId, favorites);
    
    // Retorna os favoritos atualizados
    const updatedFavorites = await container.getFavoritesUseCase.execute(authResult.customerId);
    
    return successResponse(updatedFavorites, { message: 'Favoritos sincronizados com sucesso' });
  } catch (error) {
    return handleApiError(error);
  }
}