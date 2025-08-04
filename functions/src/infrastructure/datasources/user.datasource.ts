import { User } from "../../domain/entities/user";

export interface UserDataSource {
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: string): Promise<User | null>;
}
