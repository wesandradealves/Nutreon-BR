import { PrismaClient } from '@prisma/client';
import { IFavoriteRepository } from '@/core/domain/repositories/IFavoriteRepository';

export class PrismaFavoriteRepository implements IFavoriteRepository {
  constructor(private prisma: PrismaClient) {}

  async findByCustomerId(customerId: string): Promise<Array<{ productId: string; createdAt: Date }>> {
    const favorites = await this.prisma.favorite.findMany({
      where: { customerId },
      select: {
        productId: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return favorites;
  }

  async findByCustomerAndProduct(customerId: string, productId: string): Promise<boolean> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId
        }
      }
    });

    return !!favorite;
  }

  async add(customerId: string, productId: string): Promise<void> {
    await this.prisma.favorite.create({
      data: {
        customerId,
        productId
      }
    });
  }

  async remove(customerId: string, productId: string): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        customerId_productId: {
          customerId,
          productId
        }
      }
    });
  }

  async removeAll(customerId: string): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: { customerId }
    });
  }

  async addMany(customerId: string, productIds: string[]): Promise<void> {
    const data = productIds.map(productId => ({
      customerId,
      productId
    }));

    await this.prisma.favorite.createMany({
      data,
      skipDuplicates: true
    });
  }
}