export interface IPasswordResetRepository {
  create(customerId: string, token: string, expiresAt: Date): Promise<void>;
  findByToken(token: string): Promise<{
    id: string;
    customerId: string;
    token: string;
    expiresAt: Date;
    usedAt: Date | null;
  } | null>;
  markAsUsed(token: string): Promise<void>;
  deleteExpired(): Promise<void>;
}