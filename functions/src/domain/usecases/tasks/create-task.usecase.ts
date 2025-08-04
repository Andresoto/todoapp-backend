import { Task } from "../../entities/task";
import { TaskRepository } from "../../repositories/task.repository";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string, taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!taskData.title || taskData.title.trim() === '') {
      throw new Error('Task title is required');
    }

    const newTask: Omit<Task, 'id'> = {
      userId,
      title: taskData.title,
      description: taskData.description ?? '',
      completed: taskData.completed ?? false,
      createdAt: new Date(),
    };

    return await this.taskRepository.create(newTask);
  }
}
