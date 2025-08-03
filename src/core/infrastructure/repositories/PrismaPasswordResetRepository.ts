import { PrismaClient } from '@prisma/client';
import { IPasswordResetRepository } from '@/core/domain/repositories/IPasswordResetRepository';

export class PrismaPasswordResetRepository implements IPasswordResetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(customerId: string, token: string, expiresAt: Date): Promise<void> {
    await this.prisma.passwordReset.create({
      data: {
        customerId,
        token,
        expiresAt,
      },
    });
  }

  async findByToken(token: string) {
    const passwordReset = await this.prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!passwordReset) {
      return null;
    }

    return {
      id: passwordReset.id,
      customerId: passwordReset.customerId,
      token: passwordReset.token,
      expiresAt: passwordReset.expiresAt,
      usedAt: passwordReset.usedAt,
    };
  }

  async markAsUsed(token: string): Promise<void> {
    await this.prisma.passwordReset.update({
      where: { token },
      data: { usedAt: new Date() },
    });
  }

  async deleteExpired(): Promise<void> {
    await this.prisma.passwordReset.deleteMany({
      where: {
        expiresAt: { lte: new Date() },
      },
    });
  }
}