import { STORE_STATUS_ERROR, STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';
import mockResponse from '@fixtures/apis/task-create.json';

import { initializeStore } from '@fixtures/mocks';
import { patchTask, initialState, clear } from '../patch.store';
import { rootReducer } from '../reducers';

describe('patchTask reducer', () => {
  const store = initializeStore(rootReducer);

  it('should initialize store correctly', () => {
    expect(store.getState().patch).toEqual(initialState);
  });

  describe('When dispatch action reset', () => {
    it('should reset add state data', () => {
      store.dispatch(clear());
      expect(store.getState().patch.data).toEqual(initialState.data);
    });
  });

  describe('When dispatch thunk patchTask', () => {
    it('should change state status to loading', () => {
      store.dispatch(patchTask(Promise.resolve(mockResponse as any)));
      const state = store.getState().patch;
      expect(state.status).toEqual(STORE_STATUS_LOADING);
    });

    describe('When service returns success', () => {
      it('should change state status to finished', async () => {
        await store.dispatch(patchTask(Promise.resolve(mockResponse as any)));
        expect(store.getState().patch.status).toEqual(STORE_STATUS_FINISHED);
      });

      it('should populate state data with api data returned and add token', async () => {
        await store.dispatch(patchTask(Promise.resolve(mockResponse as any)));
        expect(store.getState().patch.data).toEqual(mockResponse);
      });
    });

    describe('When service returns error', () => {
      const errorToTest = { code: 403, message: 'Forbidden!' };

      it('should change state status to error', async () => {
        await store.dispatch(patchTask(Promise.reject(errorToTest)));
        expect(store.getState().patch.status).toEqual(STORE_STATUS_ERROR);
      });

      it('should populate error state', () => {
        store.dispatch(patchTask(Promise.reject(errorToTest)));
        expect(store.getState().patch.error).toEqual({
          name: errorToTest.code,
          message: errorToTest.message
        });
      });

      it('should reset add state data', () => {
        store.dispatch(patchTask(Promise.reject(errorToTest)));
        expect(store.getState().patch.data).toEqual(initialState.data);
      });
    });
  });
});
