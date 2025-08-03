export interface ISessionRepository {
  create(data: {
    customerId: string;
    token: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }): Promise<string>;
  
  findByToken(token: string): Promise<{
    id: string;
    customerId: string;
    isActive: boolean;
    expiresAt: Date;
  } | null>;
  
  deactivate(token: string): Promise<void>;
  
  deactivateAllByCustomer(customerId: string): Promise<void>;
}