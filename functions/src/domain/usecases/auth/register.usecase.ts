import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user.repository";

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const userData: Omit<User, 'id'> = {
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.userRepository.create(userData);
  }
}
