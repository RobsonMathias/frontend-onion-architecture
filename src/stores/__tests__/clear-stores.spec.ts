import '@fixtures/mocks';

const mockClear = jest.fn();

jest.mock('modules/task/stores/tasks.store', () => ({
  clear: jest.fn().mockImplementation((...args) => mockClear(...args))
}));

import { clearAllStores } from 'stores';

describe('clearAllStores', () => {
  it('should call all stories related to company state', () => {
    const dispatch = jest.fn();
    clearAllStores(dispatch);
    expect(mockClear).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
