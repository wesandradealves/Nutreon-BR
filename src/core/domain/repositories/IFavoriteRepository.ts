export interface IFavoriteRepository {
  findByCustomerId(customerId: string): Promise<Array<{ productId: string; createdAt: Date }>>;
  findByCustomerAndProduct(customerId: string, productId: string): Promise<boolean>;
  add(customerId: string, productId: string): Promise<void>;
  remove(customerId: string, productId: string): Promise<void>;
  removeAll(customerId: string): Promise<void>;
  addMany(customerId: string, productIds: string[]): Promise<void>;
}