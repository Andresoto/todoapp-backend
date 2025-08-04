import { LoginUseCase } from "../../../../domain/usecases/auth/login.usecase";
import { MockUserRepository } from "../../../mocks/user.repository.mock";
import { createMockUser } from "../../../helpers/test-data.helpers";

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  afterEach(() => {
    mockUserRepository.clear();
  });

  describe('execute', () => {
    it('should return user when valid email is provided and user exists', async () => {
      const email = 'test@example.com';
      const mockUser = createMockUser({ email });
      mockUserRepository.addUser(mockUser);

      const result = await loginUseCase.execute(email);

      expect(result).toEqual(mockUser);
    });

    it('should return null when user does not exist', async () => {
      const email = 'nonexistent@example.com';

      const result = await loginUseCase.execute(email);

      expect(result).toBeNull();
    });

    it('should throw error when email is empty', async () => {
      await expect(loginUseCase.execute('')).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email does not contain @', async () => {
      await expect(loginUseCase.execute('invalid-email')).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email is null', async () => {
      await expect(loginUseCase.execute(null as any)).rejects.toThrow('Invalid email format');
    });

    it('should throw error when email is undefined', async () => {
      await expect(loginUseCase.execute(undefined as any)).rejects.toThrow('Invalid email format');
    });
  });
});
