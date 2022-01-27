import { STORE_STATUS_INITIALIZED } from 'constants/store';

const mockCreateSlice = jest.fn();
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  createSlice: jest.fn((...args) => mockCreateSlice(...args))
}));

import { createGenericSlice } from '../create-slice';

function composeSlice(state: any, callback: any, name?: any) {
  mockCreateSlice.mockImplementation((options) => {
    const { reducers } = options;
    callback(reducers, state);
    return {
      actions: {
        ...reducers
      }
    };
  });
  const slice = createGenericSlice({
    name,
    initialState: {
      data: {},
      status: STORE_STATUS_INITIALIZED,
      error: null
    },
    reducers: {}
  });
  return slice;
}

describe('createGenericSlice', () => {
  it('should call start successfully', () => {
    const state = {};
    composeSlice(state, (reducers: any, state: any) => reducers.start(state));
    expect(state).toEqual({ status: 'loading' });
  });

  it('should call error successfully', () => {
    const state = {};
    composeSlice(state, (reducers: any, state: any) =>
      reducers.error(state, { payload: 'mocked' })
    );
    expect(state).toEqual({ error: 'mocked', status: 'error' });
  });

  it('should call success successfully', () => {
    const state = {};
    composeSlice(state, (reducers: any, state: any) =>
      reducers.success(state, { payload: 'mocked' })
    );
    expect(state).toEqual({ status: 'finished', data: 'mocked' });
  });

  it('should call clear successfully', () => {
    const state = {};
    composeSlice(state, (reducers: any, state: any) => reducers.clear(state), 'test');
    expect(state).toEqual({ status: 'initialized', data: {}, error: null });
  });
});
