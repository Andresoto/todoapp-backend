import { CreateTaskUseCase } from "../../../../domain/usecases/tasks/create-task.usecase";
import { MockTaskRepository } from "../../../mocks/task.repository.mock";
import { createTaskData } from "../../../helpers/test-data.helpers";

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let mockTaskRepository: MockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = new MockTaskRepository();
    createTaskUseCase = new CreateTaskUseCase(mockTaskRepository);
  });

  afterEach(() => {
    mockTaskRepository.clear();
  });

  describe('execute', () => {
    it('should create and return new task with valid data', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: 'New Task', description: 'Task description' });

      const result = await createTaskUseCase.execute(userId, taskData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe(userId);
      expect(result.title).toBe(taskData.title);
      expect(result.description).toBe(taskData.description);
      expect(result.completed).toBe(false);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should create task with empty description when not provided', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: 'Task without description', description: undefined });

      const result = await createTaskUseCase.execute(userId, taskData);

      expect(result.description).toBe('');
    });

    it('should set completed to false by default', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: 'New Task', completed: undefined });

      const result = await createTaskUseCase.execute(userId, taskData);

      expect(result.completed).toBe(false);
    });

    it('should respect completed value when provided', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: 'Completed Task', completed: true });

      const result = await createTaskUseCase.execute(userId, taskData);

      expect(result.completed).toBe(true);
    });

    it('should throw error when userId is empty', async () => {
      const taskData = createTaskData();
      await expect(createTaskUseCase.execute('', taskData)).rejects.toThrow('User ID is required');
    });

    it('should throw error when userId is null', async () => {
      const taskData = createTaskData();
      await expect(createTaskUseCase.execute(null as any, taskData)).rejects.toThrow('User ID is required');
    });

    it('should throw error when title is empty', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: '' });
      await expect(createTaskUseCase.execute(userId, taskData)).rejects.toThrow('Task title is required');
    });

    it('should throw error when title is only whitespace', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: '   ' });
      await expect(createTaskUseCase.execute(userId, taskData)).rejects.toThrow('Task title is required');
    });

    it('should throw error when title is null', async () => {
      const userId = 'user-1';
      const taskData = createTaskData({ title: null as any });
      await expect(createTaskUseCase.execute(userId, taskData)).rejects.toThrow('Task title is required');
    });
  });
});
