import { UpdateTaskUseCase } from "../../../../domain/usecases/tasks/update-task.usecase";
import { MockTaskRepository } from "../../../mocks/task.repository.mock";
import { createMockTask } from "../../../helpers/test-data.helpers";

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let mockTaskRepository: MockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = new MockTaskRepository();
    updateTaskUseCase = new UpdateTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    mockTaskRepository.clear();
  });

  describe('execute', () => {
    it('should update and return task when valid data is provided', async () => {
      const existingTask = createMockTask({
        id: '1',
        title: 'Original Title',
        description: 'Original Description',
        completed: false
      });
      mockTaskRepository.addTask(existingTask);

      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
        completed: true
      };

      const result = await updateTaskUseCase.execute('1', updateData);

      expect(result.id).toBe('1');
      expect(result.title).toBe(updateData.title);
      expect(result.description).toBe(updateData.description);
      expect(result.completed).toBe(updateData.completed);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should update only provided fields', async () => {
      const existingTask = createMockTask({
        id: '1',
        title: 'Original Title',
        description: 'Original Description',
        completed: false
      });
      mockTaskRepository.addTask(existingTask);

      const updateData = {
        title: 'Updated Title Only'
      };

      const result = await updateTaskUseCase.execute('1', updateData);

      expect(result.title).toBe(updateData.title);
      expect(result.description).toBe(existingTask.description);
      expect(result.completed).toBe(existingTask.completed);
    });

    it('should update completed status only', async () => {
      const existingTask = createMockTask({
        id: '1',
        title: 'Task Title',
        completed: false
      });
      mockTaskRepository.addTask(existingTask);

      const updateData = {
        completed: true
      };

      const result = await updateTaskUseCase.execute('1', updateData);

      expect(result.completed).toBe(true);
      expect(result.title).toBe(existingTask.title);
    });

    it('should throw error when task does not exist', async () => {
      const updateData = {
        title: 'Updated Title'
      };
      await expect(updateTaskUseCase.execute('non-existent-id', updateData)).rejects.toThrow('Task not found');
    });

    it('should throw error when taskId is empty', async () => {
      const updateData = {
        title: 'Updated Title'
      };
      await expect(updateTaskUseCase.execute('', updateData)).rejects.toThrow('Task ID is required');
    });

    it('should throw error when taskId is null', async () => {
      const updateData = {
        title: 'Updated Title'
      };
      await expect(updateTaskUseCase.execute(null as any, updateData)).rejects.toThrow('Task ID is required');
    });

    it('should throw error when taskId is undefined', async () => {
      const updateData = {
        title: 'Updated Title'
      };
      await expect(updateTaskUseCase.execute(undefined as any, updateData)).rejects.toThrow('Task ID is required');
    });

    it('should set updatedAt to current date', async () => {
      const existingTask = createMockTask({ id: '1' });
      mockTaskRepository.addTask(existingTask);
      
      const beforeUpdate = new Date();
      const updateData = { title: 'Updated Title' };

      const result = await updateTaskUseCase.execute('1', updateData);

      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.updatedAt!.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    });
  });
});
