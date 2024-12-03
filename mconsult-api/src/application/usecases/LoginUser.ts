import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IAuthService } from '../../domain/services/IAuthService';
import { IHashService } from '../../domain/services/IHashService';
import { Email } from '../../domain/shared/Email';

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly authService: IAuthService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    try {
      const emailValue = Email.create(email);
      if (!emailValue) {
        throw new Error('Invalid email or password');
      }
      const user = await this.userRepository.findByEmail(emailValue);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isPasswordValid = await this.hashService.compare(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      return this.authService.generateToken(user.id_user!);
    } catch (error) {
      throw new Error('User validation error: ' + error);
    }
  }
}
