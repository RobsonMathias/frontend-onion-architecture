/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';
import { mockRouter, mockUseAuth, onAuthStateChange } from '@fixtures/mocks';
import {
  STORE_AUTH_FETCH_USER_MOCK_ERROR,
  STORE_AUTH_FETCH_USER_MOCK_INITIALIZED
} from '@fixtures/stores/auth';
import { STORE_STATUS_ERROR } from 'constants/store';

jest.mock('modules/auth', () => ({
  // @ts-ignore
  useAuth: jest.fn().mockImplementation((...args) => mockUseAuth(...args))
}));
const { push } = mockRouter;

function Mock() {
  return <div data-testid="mock-with-auth" />;
}

import { withAuth } from '../with-auth';
const Component = withAuth(Mock);

describe('withAuth', () => {
  describe('when the request return a error', () => {
    it('should call redirect with UNAUTHORIZED_CODE', () => {
      mockUseAuth.mockReturnValue({
        onAuthStateChange,
        auth: STORE_AUTH_FETCH_USER_MOCK_ERROR
      });
      render(<Component />);
      expect(push).toHaveBeenCalledWith('/');
    });

    it('should NOT call redirect with unknown error', () => {
      mockUseAuth.mockReturnValue({
        onAuthStateChange,
        auth: {
          ...STORE_AUTH_FETCH_USER_MOCK_INITIALIZED,
          error: {
            message: 'UNKNOWN',
            name: 'UNKNOWN'
          },
          status: STORE_STATUS_ERROR
        }
      });
      render(<Component />);
      expect(push).not.toHaveBeenCalled();
    });
  });
});
