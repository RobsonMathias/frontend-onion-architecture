import { STORE_AUTH_FETCH_USER_MOCK_INITIALIZED } from './user.store';

export * from './user.store';

export const mockAuthStore = {
  auth: {
    user: STORE_AUTH_FETCH_USER_MOCK_INITIALIZED
  },
  clear: jest.fn()
};
