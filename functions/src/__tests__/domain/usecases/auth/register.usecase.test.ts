import { RegisterUseCase } from "../../../../domain/usecases/auth/register.usecase";
import { MockUserRepository } from "../../../mocks/user.repository.mock";
import { createMockUser } from "../../../helpers/test-data.helpers";

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    registerUseCase = new RegisterUseCase(mockUserRepository);
  });

  afterEach(() => {
    mockUserRepository.clear();
  });

  describe('execute', () => {
    it('should create and return new user when valid email is provided', async () => {
      const email = 'newuser@example.com';

      const result = await registerUseCase.execute(email);

      expect(result).toBeDefined();
      expect(result.email).toBe(email);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw error when user already exists', async () => {
      const email = 'existing@example.com';
      const existingUser = createMockUser({ email });
      mockUserRepository.addUser(existingUser);

      await expect(registerUseCase.execute(email)).rejects.toThrow('User already exists');
    });

    it('should throw error when email is empty', async () => {
      await expect(registerUseCase.execute('')).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email does not contain @', async () => {
      await expect(registerUseCase.execute('invalid-email')).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email is null', async () => {
      await expect(registerUseCase.execute(null as any)).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email is undefined', async () => {
      await expect(registerUseCase.execute(undefined as any)).rejects.toThrow('Invalid email format');
    });

    it('should set createdAt and updatedAt to the same date', async () => {
      const email = 'test@example.com';

      const result = await registerUseCase.execute(email);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
      const timeDiff = Math.abs(result.updatedAt!.getTime() - result.createdAt!.getTime());
      expect(timeDiff).toBeLessThan(1000);
    });
  });
});
