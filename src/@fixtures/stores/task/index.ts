import { STORE_TASK_FETCH_LIST_MOCK_INITIALIZED } from './tasks.store';
import { STORE_TASK_PATCH_MOCK_INITIALIZED } from './patch.store';

export * from './tasks.store';

export const mockTaskStore = {
  task: {
    list: STORE_TASK_FETCH_LIST_MOCK_INITIALIZED,
    patch: STORE_TASK_PATCH_MOCK_INITIALIZED
  },
  clear: jest.fn()
};
