/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { STORE_AUTH_FETCH_USER_MOCK_FINISHED as mockAuthUserStore } from '@fixtures/stores/auth';
import { mockAuthStore } from '@fixtures/stores/auth';

function Mock({ onSubmit }: LoginComponentProps) {
  return (
    <div
      data-testid="mock"
      onClick={() =>
        onSubmit({
          email: 'email',
          password: 'password'
        })
      }
    />
  );
}

const mockLogin = jest.fn();
jest.mock('../../hooks', () => {
  return {
    useLogin: jest.fn(() => ({
      login: jest.fn((...args) => mockLogin(...args)),
      auth: {
        ...mockAuthStore.auth,
        user: mockAuthUserStore
      }
    }))
  };
});
jest.mock(__dirname + '/../login.component', () => ({
  LoginComponent: Mock
}));

import { LoginContainer } from '../login.container';
import { LoginComponentProps } from '../login.component';

describe('LoginContainer', () => {
  it('should render successfully', () => {
    const { container } = render(<LoginContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should call handleSubmit successfully', async () => {
    const { getByTestId } = render(<LoginContainer />);

    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });

    expect(mockLogin).toHaveBeenCalledWith('email', 'password');
  });
});
