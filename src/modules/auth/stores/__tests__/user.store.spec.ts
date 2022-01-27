import { STORE_STATUS_ERROR, STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';
import authMockResponse from '@fixtures/apis/auth.json';

import { initializeStore } from '@fixtures/mocks';
import { fetchAuth, initialState, clear } from '../user.store';
import { rootReducer } from '../reducers';

describe('Auth reducer', () => {
  const store = initializeStore(rootReducer);

  it('should initialize store correctly', () => {
    expect(store.getState().user).toEqual(initialState);
  });

  describe('When dispatch action reset', () => {
    it('should reset user state data', () => {
      store.dispatch(clear());
      expect(store.getState().user.data).toEqual(initialState.data);
    });
  });

  describe('When dispatch thunk fetchAuth', () => {
    it('should change state status to loading', () => {
      store.dispatch(fetchAuth(Promise.resolve(authMockResponse)));
      const authUserState = store.getState().user;
      expect(authUserState.status).toEqual(STORE_STATUS_LOADING);
    });

    describe('When service returns success', () => {
      it('should change state status to finished', async () => {
        await store.dispatch(fetchAuth(Promise.resolve(authMockResponse)));
        expect(store.getState().user.status).toEqual(STORE_STATUS_FINISHED);
      });

      it('should populate state data with api data returned and user token', async () => {
        await store.dispatch(fetchAuth(Promise.resolve(authMockResponse)));
        expect(store.getState().user.data).toEqual(authMockResponse);
      });
    });

    describe('When service returns error', () => {
      const errorToTest = { code: 403, message: 'Forbidden!' };

      it('should change state status to error', async () => {
        await store.dispatch(fetchAuth(Promise.reject(errorToTest)));
        expect(store.getState().user.status).toEqual(STORE_STATUS_ERROR);
      });

      it('should populate error state', () => {
        store.dispatch(fetchAuth(Promise.reject(errorToTest)));
        expect(store.getState().user.error).toEqual({
          name: errorToTest.code,
          message: errorToTest.message
        });
      });

      it('should reset user state data', () => {
        store.dispatch(fetchAuth(Promise.reject(errorToTest)));
        expect(store.getState().user.data).toEqual(initialState.data);
      });
    });
  });
});
