import { ISessionRepository } from '@/core/domain/repositories/ISessionRepository';

export class LogoutCustomerUseCase {
  constructor(
    private readonly sessionRepository: ISessionRepository
  ) {}

  async execute(token: string): Promise<void> {
    // Buscar sessão para validar se existe e está ativa
    const session = await this.sessionRepository.findByToken(token);
    
    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    if (!session.isActive) {
      // Sessão já está inativa, não precisa fazer nada
      return;
    }

    // Desativar sessão
    await this.sessionRepository.deactivate(token);
  }
}