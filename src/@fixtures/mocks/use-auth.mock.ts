import { STORE_AUTH_FETCH_USER_MOCK_FINISHED } from '../stores/auth';

export const onAuthStateChange = jest.fn(() => ({ unsubscribe: jest.fn() }));
export const mockUseAuth = jest.fn(() => ({
  auth: STORE_AUTH_FETCH_USER_MOCK_FINISHED,
  onAuthStateChange
}));
