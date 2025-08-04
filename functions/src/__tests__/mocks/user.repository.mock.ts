import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";

export class MockUserRepository implements UserRepository {
  private users: User[] = [];
  private nextId = 1;

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.nextId.toString(),
    };
    this.nextId++;
    this.users.push(newUser);
    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  clear(): void {
    this.users = [];
    this.nextId = 1;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return [...this.users];
  }
}
