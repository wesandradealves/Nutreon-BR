import * as jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '@/core/application/interfaces/ITokenService';

export class JwtTokenService implements ITokenService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string = '7d'
  ) {}

  async generateToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(
      { customerId: payload.customerId, email: payload.email },
      this.secret,
      { expiresIn: this.expiresIn }
    );
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch {
      return null;
    }
  }
}