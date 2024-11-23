import { User } from "../../domain/enitites/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { HashService } from "../../domain/services/HashService";


export class RegisterUser {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly hashService: HashService
    ) {}

    async execute(user: User): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
          throw new Error("User already exists");
        }
    
        const hashedPassword = await this.hashService.hash(user.password);
        user.password = hashedPassword;
        await this.userRepository.create(user);
      }
}