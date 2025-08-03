import { PrismaClient } from '@prisma/client';
import { ICustomerRepository } from '@/core/domain/repositories/ICustomerRepository';
import { Customer } from '@/core/domain/entities/Customer';
import { Email } from '@/core/domain/value-objects/Email';
import { Phone } from '@/core/domain/value-objects/Phone';
import { Address } from '@/core/domain/value-objects/Address';

export class PrismaCustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(customer: Customer): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Salvar ou atualizar cliente
      await tx.customer.upsert({
        where: { id: customer.id },
        create: {
          id: customer.id,
          email: customer.email.value,
          name: customer.name,
          phone: customer.phone?.value,
          passwordHash: customer.passwordHash,
          verified: customer.verified,
          nuvemshopId: customer.nuvemshopId,
        },
        update: {
          email: customer.email.value,
          name: customer.name,
          phone: customer.phone?.value,
          passwordHash: customer.passwordHash,
          verified: customer.verified,
          nuvemshopId: customer.nuvemshopId,
        },
      });

      // Deletar endereços antigos e inserir novos (replace strategy)
      await tx.address.deleteMany({
        where: { customerId: customer.id },
      });

      // Inserir novos endereços
      if (customer.addresses.length > 0) {
        await tx.address.createMany({
          data: customer.addresses.map(addr => ({
            id: addr.id,
            customerId: customer.id,
            street: addr.street,
            number: addr.number,
            complement: addr.complement,
            neighborhood: addr.neighborhood,
            city: addr.city,
            state: addr.state,
            zipCode: addr.zipCode,
            country: addr.country,
            isDefault: addr.isDefault,
          })),
        });
      }
    });
  }

  async findById(id: string): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({
      where: { id },
      include: { addresses: true },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByEmail(email: Email): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({
      where: { email: email.value },
      include: { addresses: true },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByNuvemshopId(nuvemshopId: string): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({
      where: { nuvemshopId },
      include: { addresses: true },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async exists(email: Email): Promise<boolean> {
    const count = await this.prisma.customer.count({
      where: { email: email.value },
    });

    return count > 0;
  }

  private toDomain(data: {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    passwordHash: string | null;
    verified: boolean;
    nuvemshopId: string | null;
    addresses?: Array<{
      id: string;
      street: string;
      number: string;
      complement: string | null;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      isDefault: boolean;
    }>;
  }): Customer {
    const addresses = data.addresses?.map((addr) =>
      Address.create({
        street: addr.street,
        number: addr.number,
        complement: addr.complement,
        neighborhood: addr.neighborhood,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country,
        isDefault: addr.isDefault,
      })
    );

    return Customer.create(
      {
        email: Email.create(data.email),
        name: data.name,
        phone: data.phone ? Phone.create(data.phone) : undefined,
        passwordHash: data.passwordHash,
        verified: data.verified,
        nuvemshopId: data.nuvemshopId,
        addresses,
      },
      data.id
    );
  }
}