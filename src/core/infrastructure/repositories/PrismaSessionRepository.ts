import { PrismaClient } from '@prisma/client';
import { ISessionRepository } from '@/core/domain/repositories/ISessionRepository';

export class PrismaSessionRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: {
    customerId: string;
    token: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }): Promise<string> {
    const session = await this.prisma.session.create({
      data: {
        customerId: data.customerId,
        token: data.token,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        expiresAt: data.expiresAt,
      },
    });

    return session.id;
  }

  async findByToken(token: string): Promise<{
    id: string;
    customerId: string;
    isActive: boolean;
    expiresAt: Date;
  } | null> {
    const session = await this.prisma.session.findUnique({
      where: { token },
      select: {
        id: true,
        customerId: true,
        isActive: true,
        expiresAt: true,
      },
    });

    return session;
  }

  async deactivate(token: string): Promise<void> {
    await this.prisma.session.update({
      where: { token },
      data: {
        isActive: false,
        loggedOutAt: new Date(),
      },
    });
  }

  async deactivateAllByCustomer(customerId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: {
        customerId,
        isActive: true,
      },
      data: {
        isActive: false,
        loggedOutAt: new Date(),
      },
    });
  }
}