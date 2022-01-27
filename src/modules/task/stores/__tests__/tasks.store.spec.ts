import { STORE_STATUS_ERROR, STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';

import { initializeStore } from '@fixtures/mocks';
import { fetchList, initialState, clear } from '../tasks.store';
import { rootReducer } from '../reducers';
import mockResponse from '@fixtures/apis/task-list.json';

describe('fetchList reducer', () => {
  const store = initializeStore(rootReducer);

  it('should initialize store correctly', () => {
    expect(store.getState().list).toEqual(initialState);
  });

  describe('When dispatch action reset', () => {
    it('should reset user state data', () => {
      store.dispatch(clear());
      expect(store.getState().list.data).toEqual(initialState.data);
    });
  });

  describe('When dispatch thunk fetchList', () => {
    it('should change state status to loading', () => {
      store.dispatch(fetchList(Promise.resolve(mockResponse as any)));
      const authUserState = store.getState().list;
      expect(authUserState.status).toEqual(STORE_STATUS_LOADING);
    });

    describe('When service returns success', () => {
      it('should change state status to finished', async () => {
        await store.dispatch(fetchList(Promise.resolve(mockResponse as any)));
        expect(store.getState().list.status).toEqual(STORE_STATUS_FINISHED);
      });

      it('should populate state data with api data returned and user token', async () => {
        await store.dispatch(fetchList(Promise.resolve(mockResponse as any)));
        expect(store.getState().list.data).toEqual([
          { description: 'Test done', id: '123', status: 'done' },
          { description: 'Test in progress', id: '456', status: 'in-progress' },
          { description: 'Test new', id: '789', status: 'new' }
        ]);
      });
    });

    describe('When service returns error', () => {
      const errorToTest = { code: 403, message: 'Forbidden!' };

      it('should change state status to error', async () => {
        await store.dispatch(fetchList(Promise.reject(errorToTest)));
        expect(store.getState().list.status).toEqual(STORE_STATUS_ERROR);
      });

      it('should populate error state', () => {
        store.dispatch(fetchList(Promise.reject(errorToTest)));
        expect(store.getState().list.error).toEqual({
          name: errorToTest.code,
          message: errorToTest.message
        });
      });

      it('should reset user state data', () => {
        store.dispatch(fetchList(Promise.reject(errorToTest)));
        expect(store.getState().list.data).toEqual(initialState.data);
      });
    });
  });
});
