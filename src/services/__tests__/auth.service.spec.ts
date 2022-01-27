import { AuthService } from '../auth.service';
import { mockServiceInstance } from '@fixtures/mocks';

describe('AuthService', () => {
  let service: AuthService = new AuthService(mockServiceInstance);

  it('should call signInWithGoogle successfully', async () => {
    mockServiceInstance.post.mockResolvedValue({ email: 'mocked' });
    await service.signInWithGoogle();
    expect(mockServiceInstance.post).toHaveBeenCalledWith('/auth', {
      email: 'signed-with-google'
    });
  });

  it('should call signIn successfully', async () => {
    mockServiceInstance.post.mockResolvedValue({ email: 'mocked' });
    await service.signIn('email', 'password');
    expect(mockServiceInstance.setInterceptorHeaders).toHaveBeenCalledWith({
      Authorization: 'Bearer mocked'
    });
    expect(mockServiceInstance.post).toHaveBeenCalledWith('/auth', {
      email: 'email',
      password: 'password'
    });
  });

  it('should call signUp successfully', async () => {
    mockServiceInstance.post.mockResolvedValue({ email: 'mocked' });
    await service.signUp({
      email: 'email',
      password: 'password',
      name: 'name'
    });
    expect(mockServiceInstance.post).toHaveBeenCalledWith('/auth', {
      email: 'email',
      password: 'password',
      name: 'name'
    });
  });

  it('should call signOut successfully', async () => {
    await service.signOut();
    expect(mockServiceInstance.removeInterceptorHeaders).toHaveBeenCalled();
  });
});
