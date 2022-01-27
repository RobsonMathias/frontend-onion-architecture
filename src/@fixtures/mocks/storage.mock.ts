export const storage = {
  get: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
} as any;

export const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  length: jest.fn()
} as any;
