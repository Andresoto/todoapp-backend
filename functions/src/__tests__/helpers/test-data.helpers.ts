import { Task } from "../../domain/entities/task";
import { User } from "../../domain/entities/user";

export const createMockTask = (overrides: Partial<Task> = {}): Task => {
  return {
    id: '1',
    userId: 'user-1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
    ...overrides,
  };
};

export const createMockUser = (overrides: Partial<User> = {}): User => {
  return {
    id: '1',
    email: 'test@example.com',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
    ...overrides,
  };
};

export const createTaskData = (overrides: Partial<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> = {}) => {
  return {
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    ...overrides,
  };
};
