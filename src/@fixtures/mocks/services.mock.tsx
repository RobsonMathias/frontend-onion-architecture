import { Service } from 'services/service';

const auth = {
  onAuthStateChange: jest.fn(),
  signOut: jest.fn(),
  signIn: jest.fn(),
  signInWithGoogle: jest.fn(),
  signUp: jest.fn()
};

const task = {
  list: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

function ServicesProvider({ children }: any) {
  return <div>{children}</div>;
}

const instances = {
  auth,
  task
};
const mock = {
  ServicesProvider,
  useService: jest.fn(() => instances)
};
jest.doMock('services', () => mock);

export const mockServices = {
  mock,
  auth,
  task
};

export const mockServiceInstance = {
  patch: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  setInterceptorHeaders: jest.fn(),
  removeInterceptorHeaders: jest.fn()
} as any;
