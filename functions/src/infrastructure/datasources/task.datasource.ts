import { Task } from "../../domain/entities/task";

export interface TaskDataSource {
  findByUserId(userId: string): Promise<Task[]>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | null>;
}
