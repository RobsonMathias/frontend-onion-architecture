/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { initializeStore, mockAdapters } from '@fixtures/mocks-integration';
import authMockResponse from '@fixtures/apis/auth.json';
import { Provider } from 'react-redux';
import { STORE_STATUS_INITIALIZED } from 'constants/store';

import { LogoutContainer } from '../logout.container';
import { ServicesProvider } from 'services';
import { rootReducer as auth } from '../../stores';

describe('LogoutContainer', () => {
  let store: any;

  beforeEach(() => {
    store = initializeStore({
      auth
    });
  });

  it('should submit successfully', async () => {
    mockAdapters.post.mockReturnValue(authMockResponse);
    const { getByTestId } = render(
      <Provider store={store}>
        <ServicesProvider>
          <LogoutContainer />
        </ServicesProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('logout'));
    });

    expect(mockAdapters.removeInterceptorHeaders).toHaveBeenCalled();
    expect(store.getState().auth.user).toEqual({
      data: {
        displayName: '',
        email: '',
        id: '',
        token: ''
      },
      error: null,
      status: STORE_STATUS_INITIALIZED
    });
  });
});
