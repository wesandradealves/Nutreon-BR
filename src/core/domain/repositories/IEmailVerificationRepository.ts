export interface IEmailVerificationRepository {
  create(customerId: string, token: string, expiresAt: Date): Promise<void>;
  
  findByToken(token: string): Promise<{
    id: string;
    customerId: string;
    token: string;
    expiresAt: Date;
    verifiedAt: Date | null;
  } | null>;
  
  findByCustomerId(customerId: string): Promise<{
    id: string;
    customerId: string;
    token: string;
    expiresAt: Date;
    verifiedAt: Date | null;
  }[]>;
  
  markAsVerified(token: string): Promise<void>;
  
  delete(id: string): Promise<void>;
  
  deleteExpired(): Promise<void>;
}