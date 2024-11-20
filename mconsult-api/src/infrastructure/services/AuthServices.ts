import jwt from "jsonwebtoken";
import { IAuthService } from "../../domain/services/IAuthService";
import { jwtConfig } from "../../config/jwtConfig";

export class AuthService implements IAuthService {
  /**
   * Gera um token JWT baseado no ID do usuário.
   * @param userId ID do usuário.
   * @returns O token JWT gerado.
   */
  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }

  /**
   * Valida e decodifica um token JWT.
   * @param token O token JWT.
   * @returns O payload decodificado.
   * @throws Erro se o token for inválido ou expirado.
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}