/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { initializeStore, mockAdapters } from '@fixtures/mocks-integration';
import authMockResponse from '@fixtures/apis/auth.json';
import { Provider } from 'react-redux';
import { STORE_STATUS_FINISHED } from 'constants/store';

import { GoogleContainer } from '../google.container';
import { ServicesProvider } from 'services';
import { rootReducer as auth } from '../../stores';

describe('GoogleContainer', () => {
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
          <GoogleContainer />
        </ServicesProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('google-submit'));
    });

    expect(mockAdapters.post).toHaveBeenCalledWith('/auth', {
      email: 'signed-with-google'
    });
    expect(store.getState().auth.user).toEqual({
      data: {
        displayName: 'Example',
        email: 'example@example.com.br',
        id: 'id',
        token: 'token'
      },
      error: null,
      status: STORE_STATUS_FINISHED
    });
  });
});
