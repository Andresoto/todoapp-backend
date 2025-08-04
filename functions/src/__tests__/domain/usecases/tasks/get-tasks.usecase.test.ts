import { GetTasksUseCase } from "../../../../domain/usecases/tasks/get-tasks.usecase";
import { MockTaskRepository } from "../../../mocks/task.repository.mock";
import { createMockTask } from "../../../helpers/test-data.helpers";

describe('GetTasksUseCase', () => {
  let getTasksUseCase: GetTasksUseCase;
  let mockTaskRepository: MockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = new MockTaskRepository();
    getTasksUseCase = new GetTasksUseCase(mockTaskRepository);
  });

  afterEach(() => {
    mockTaskRepository.clear();
  });

  describe('execute', () => {
    it('should return tasks for specified user', async () => {
      const userId = 'user-1';
      const task1 = createMockTask({ userId, title: 'Task 1' });
      const task2 = createMockTask({ userId, title: 'Task 2', id: '2' });
      const task3 = createMockTask({ userId: 'user-2', title: 'Task 3', id: '3' });

      mockTaskRepository.addTask(task1);
      mockTaskRepository.addTask(task2);
      mockTaskRepository.addTask(task3);


      const result = await getTasksUseCase.execute(userId);

      expect(result).toHaveLength(2);
      expect(result).toEqual(expect.arrayContaining([task1, task2]));
      expect(result).not.toEqual(expect.arrayContaining([task3]));
    });

    it('should return empty array when user has no tasks', async () => {
      const userId = 'user-with-no-tasks';


      const result = await getTasksUseCase.execute(userId);

      expect(result).toEqual([]);
    });

    it('should throw error when userId is empty', async () => {
      await expect(getTasksUseCase.execute('')).rejects.toThrow('User ID is required');
    });

    it('should throw error when userId is null', async () => {
      await expect(getTasksUseCase.execute(null as any)).rejects.toThrow('User ID is required');
    });

    it('should throw error when userId is undefined', async () => {
      await expect(getTasksUseCase.execute(undefined as any)).rejects.toThrow('User ID is required');
    });
  });
});
