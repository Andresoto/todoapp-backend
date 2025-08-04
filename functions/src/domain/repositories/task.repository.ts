import { Task } from "../entities/task";

export interface TaskRepository {
  findByUserId(userId: string): Promise<Task[]>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | null>;
}
