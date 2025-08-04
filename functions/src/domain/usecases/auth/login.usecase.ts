import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user.repository";

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    return await this.userRepository.findByEmail(email);
  }
}
