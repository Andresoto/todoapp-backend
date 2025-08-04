import { TaskRepository } from "../../repositories/task.repository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(taskId);
  }
}
