import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { Phone } from '@/core/domain/value-objects/Phone';

export interface UpdateCustomerDTO {
  customerId: string;
  name: string;
  phone?: string;
}

export class UpdateCustomerUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository
  ) {}

  async execute(dto: UpdateCustomerDTO): Promise<void> {
    // Buscar cliente
    const customer = await this.customerRepository.findById(dto.customerId);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    // Atualizar dados (email não pode ser alterado)
    customer.updateName(dto.name);
    
    // Atualizar telefone se fornecido
    if (dto.phone) {
      customer.updatePhone(Phone.create(dto.phone));
    } else {
      customer.updatePhone(undefined);
    }

    // Salvar alterações
    await this.customerRepository.save(customer);
  }
}