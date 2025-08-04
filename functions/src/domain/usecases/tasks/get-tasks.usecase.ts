import { Task } from "../../entities/task";
import { TaskRepository } from "../../repositories/task.repository";

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.taskRepository.findByUserId(userId);
  }
}
