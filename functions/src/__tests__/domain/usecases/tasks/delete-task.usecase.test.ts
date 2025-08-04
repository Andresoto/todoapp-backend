import { DeleteTaskUseCase } from "../../../../domain/usecases/tasks/delete-task.usecase";
import { MockTaskRepository } from "../../../mocks/task.repository.mock";
import { createMockTask } from "../../../helpers/test-data.helpers";

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let mockTaskRepository: MockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = new MockTaskRepository();
    deleteTaskUseCase = new DeleteTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    mockTaskRepository.clear();
  });

  describe('execute', () => {
    it('should delete task when valid taskId is provided', async () => {
      const task = createMockTask({ id: '1' });
      mockTaskRepository.addTask(task);

      expect(await mockTaskRepository.findById('1')).toEqual(task);

      await deleteTaskUseCase.execute('1');

      expect(await mockTaskRepository.findById('1')).toBeNull();
    });

    it('should not throw when deleting existing task', async () => {
      const task = createMockTask({ id: '1' });
      mockTaskRepository.addTask(task);

      await expect(deleteTaskUseCase.execute('1')).resolves.toBeUndefined();
    });

    it('should throw error when task does not exist', async () => {
      await expect(deleteTaskUseCase.execute('non-existent-id')).rejects.toThrow('Task not found');
    });

    it('should throw error when taskId is empty', async () => {
      await expect(deleteTaskUseCase.execute('')).rejects.toThrow('Task ID is required');
    });

    it('should throw error when taskId is null', async () => {
      await expect(deleteTaskUseCase.execute(null as any)).rejects.toThrow('Task ID is required');
    });

    it('should throw error when taskId is undefined', async () => {
      await expect(deleteTaskUseCase.execute(undefined as any)).rejects.toThrow('Task ID is required');
    });

    it('should only delete the specified task', async () => {
      const task1 = createMockTask({ id: '1', title: 'Task 1' });
      const task2 = createMockTask({ id: '2', title: 'Task 2' });
      const task3 = createMockTask({ id: '3', title: 'Task 3' });

      mockTaskRepository.addTask(task1);
      mockTaskRepository.addTask(task2);
      mockTaskRepository.addTask(task3);

      await deleteTaskUseCase.execute('2');

      expect(await mockTaskRepository.findById('1')).toEqual(task1);
      expect(await mockTaskRepository.findById('2')).toBeNull();
      expect(await mockTaskRepository.findById('3')).toEqual(task3);
    });
  });
});
