import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { TaskDataSource } from "../datasources/task.datasource";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private taskDataSource: TaskDataSource) {}

  async findByUserId(userId: string): Promise<Task[]> {
    return await this.taskDataSource.findByUserId(userId);
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    return await this.taskDataSource.create(task);
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    return await this.taskDataSource.update(id, task);
  }

  async delete(id: string): Promise<void> {
    return await this.taskDataSource.delete(id);
  }

  async findById(id: string): Promise<Task | null> {
    return await this.taskDataSource.findById(id);
  }
}
