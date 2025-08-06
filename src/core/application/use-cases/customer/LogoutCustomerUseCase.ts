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
    try {
      await this.sessionRepository.delete(token);
    } catch {
      // Fallback para desativar se delete falhar
      await this.sessionRepository.deactivate(token);
    }
  }
}