import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../AuthServices';

const authService = new AuthService();

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token is missing' });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const decoded: { id: string } = authService.verifyToken(token);
      req.userId = decoded.id; // Adiciona o ID do usuário à requisição
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}
