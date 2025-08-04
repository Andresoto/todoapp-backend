import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDataSource } from "../datasources/user.datasource";

export class UserRepositoryImpl implements UserRepository {
  constructor(private userDataSource: UserDataSource) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userDataSource.findByEmail(email);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    return await this.userDataSource.create(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userDataSource.findById(id);
  }
}
