import { Customer } from '../entities/Customer';
import { Email } from '../value-objects/Email';

export interface ICustomerRepository {
  save(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: Email): Promise<Customer | null>;
  findByNuvemshopId(nuvemshopId: string): Promise<Customer | null>;
  exists(email: Email): Promise<boolean>;
}