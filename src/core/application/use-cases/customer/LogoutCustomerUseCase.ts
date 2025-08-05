import { ISessionRepository } from '@/core/domain/repositories/ISessionRepository';

export class LogoutCustomerUseCase {
  constructor(
    private readonly sessionRepository: ISessionRepository
  ) {}

  async execute(token: string): Promise<void> {
    // Buscar sessão para validar se existe
    const session = await this.sessionRepository.findByToken(token);
    
    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    // Deletar sessão completamente
    if ('delete' in this.sessionRepository) {
      await this.sessionRepository.delete(token);
    } else {
      // Fallback para desativar se delete não existir
      await this.sessionRepository.deactivate(token);
    }
  }
}