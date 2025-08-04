import { Task } from "../../domain/entities/task";
import { TaskRepository } from "../../domain/repositories/task.repository";

export class MockTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  async findByUserId(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId);
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: this.nextId.toString(),
    };
    this.nextId++;
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: string, taskUpdate: Partial<Task>): Promise<Task> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = { ...this.tasks[taskIndex], ...taskUpdate };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find(task => task.id === id) || null;
  }

  clear(): void {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
}