/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { mockServices, mockStore } from '@fixtures/mocks';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { mockAuthStore } from '@fixtures/stores/auth';

const callback = jest.fn();
const mockClear = jest.fn();
const mockFetchAuth = jest.fn();
jest.mock('../../stores/user.store', () => ({
  fetchAuth: jest.fn((...args) => mockFetchAuth(...args)),
  clear: jest.fn((...args) => mockClear(...args))
}));
const { auth } = mockServices;
const { useSelector } = mockStore;

import { useAuth } from '../use-auth';

function Component() {
  const { onAuthStateChange, logout } = useAuth();
  return (
    <>
      <div data-testid="mock-logout" onClick={() => logout()} />
      <div data-testid="mock" onClick={() => onAuthStateChange(callback)} />
    </>
  );
}

describe('useAuth', () => {
  it('should update auth changes with valid token successfully', async () => {
    useSelector.mockReturnValue(mockAuthStore.auth);
    const given = { token: 'MOCKED' };
    auth.onAuthStateChange.mockImplementation((call) => call(given));
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });
    expect(mockFetchAuth).toHaveBeenCalled();
    expect(auth.onAuthStateChange).toHaveBeenCalled();
  });

  it('should call a callback when token is undefined', async () => {
    useSelector.mockReturnValue(mockAuthStore.auth);
    auth.onAuthStateChange.mockImplementation((call) => call(null));
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });
    expect(mockFetchAuth).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(auth.onAuthStateChange).toHaveBeenCalled();
  });

  it('should call a logout successfully', async () => {
    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-logout'));
    });
    expect(mockClear).toHaveBeenCalled();
    expect(auth.signOut).toHaveBeenCalled();
  });
});
