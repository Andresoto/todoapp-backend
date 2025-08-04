import { Task } from "../../entities/task";
import { TaskRepository } from "../../repositories/task.repository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, taskData: Partial<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Task> {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const updateData: Partial<Task> = {
      ...taskData,
      updatedAt: new Date(),
    };

    return await this.taskRepository.update(taskId, updateData);
  }
}
