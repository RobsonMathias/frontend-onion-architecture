import { mockHttp } from '../mocks/http.mock';

export const mockAdapters = {
  ...mockHttp,
  removeInterceptorHeaders: jest.fn(),
  setInterceptorHeaders: jest.fn()
};

jest.mock('adapters', () => ({
  AnalyticsAdapter: jest.fn(() => ({
    ...mockAdapters
  })),
  IndexDbAdapter: jest.fn(() => ({
    ...mockAdapters
  })),
  StorageAdapter: jest.fn(() => ({
    ...mockAdapters
  })),
  ApiAdapter: jest.fn(() => ({
    ...mockAdapters
  }))
}));
