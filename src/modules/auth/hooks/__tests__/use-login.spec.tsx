/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { mockServices, mockStore } from '@fixtures/mocks';
import { act, fireEvent, render } from '@testing-library/react';
import { mockAuthStore, STORE_AUTH_FETCH_USER_MOCK_FINISHED } from '@fixtures/stores/auth';
import React from 'react';

const mockFetchAuth = jest.fn();
jest.mock('../../stores/user.store', () => ({
  fetchAuth: jest.fn((...args) => mockFetchAuth(...args))
}));
const { auth } = mockServices;

const { useSelector } = mockStore;
import { useLogin } from 'modules/auth';

function Component() {
  const { login, loginWithGoogle } = useLogin();
  return (
    <>
      <div data-testid="mock" onClick={() => login('email', '123')} />
      <div data-testid="mock-google" onClick={() => loginWithGoogle()} />
    </>
  );
}

describe('useLogin', () => {
  it('should call logout successfully', async () => {
    useSelector.mockReturnValue({
      auth: {
        ...mockAuthStore.auth,
        user: STORE_AUTH_FETCH_USER_MOCK_FINISHED
      }
    });
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });
    expect(auth.signIn).toHaveBeenCalled();
  });

  it('should call loginWithGoogle successfully', async () => {
    useSelector.mockReturnValue({
      auth: {
        ...mockAuthStore.auth,
        user: STORE_AUTH_FETCH_USER_MOCK_FINISHED
      }
    });
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-google'));
    });
    expect(auth.signInWithGoogle).toHaveBeenCalled();
  });
});
