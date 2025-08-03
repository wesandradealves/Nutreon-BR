import { PrismaClient } from '@prisma/client';
import { IEmailVerificationRepository } from '@/core/domain/repositories/IEmailVerificationRepository';

export class PrismaEmailVerificationRepository implements IEmailVerificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(customerId: string, token: string, expiresAt: Date): Promise<void> {
    await this.prisma.emailVerification.create({
      data: {
        customerId,
        token,
        expiresAt,
      },
    });
  }

  async findByToken(token: string): Promise<{
    id: string;
    customerId: string;
    token: string;
    expiresAt: Date;
    verifiedAt: Date | null;
  } | null> {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    return verification;
  }

  async markAsVerified(token: string): Promise<void> {
    await this.prisma.emailVerification.update({
      where: { token },
      data: {
        verifiedAt: new Date(),
      },
    });
  }

  async deleteExpired(): Promise<void> {
    await this.prisma.emailVerification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        verifiedAt: null,
      },
    });
  }
}