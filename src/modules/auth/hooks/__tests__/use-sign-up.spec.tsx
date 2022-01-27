/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { mockServices, mockStore } from '@fixtures/mocks';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { mockAuthStore } from '@fixtures/stores/auth';
import response from '@fixtures/apis/auth.json';

const mockFetchAuth = jest.fn();
jest.mock('../../stores/user.store', () => ({
  fetchAuth: jest.fn((...args) => mockFetchAuth(...args))
}));
const { auth } = mockServices;
const { useSelector } = mockStore;

import { useSignUp } from 'modules/auth';

function Component() {
  const { signUp } = useSignUp();
  const given = {
    email: 'example@example.com.br',
    password: '123',
    name: 'Example'
  };
  return <div data-testid="mock" onClick={() => signUp(given)} />;
}

describe('useSignUp', () => {
  it('should update auth changes with valid register successfully', async () => {
    useSelector.mockReturnValue(mockAuthStore.auth);
    auth.signUp.mockReturnValue(response);
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });
    expect(mockFetchAuth).toHaveBeenCalledWith({
      email: 'example@example.com.br',
      token: 'token',
      displayName: 'Example',
      id: 'id'
    });
    expect(auth.signUp).toHaveBeenCalled();
  });
});
