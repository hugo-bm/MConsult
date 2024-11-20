export interface IAuthService {
    /**
     * Gera um token JWT baseado no ID do usuário.
     * @param userId ID do usuário.
     * @returns O token JWT gerado.
     */
    generateToken(userId: string): string;
  
    /**
     * Valida e decodifica um token JWT.
     * @param token O token JWT.
     * @returns O payload decodificado.
     * @throws Erro se o token for inválido ou expirado.
     */
    verifyToken(token: string): any;
  }