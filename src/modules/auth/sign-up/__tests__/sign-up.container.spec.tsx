/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { mockComponent } from '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';
import {
  mockAuthStore,
  STORE_AUTH_FETCH_USER_MOCK_FINISHED as mockAuthUserStore
} from '@fixtures/stores/auth';

jest.mock('../../hooks', () => ({
  useSignUp: jest.fn(() => ({ ...mockAuthStore.auth, ...mockAuthUserStore }))
}));
jest.mock(__dirname + '/../sign-up.component', () => mockComponent(['SignUpComponent']));

import { SignUpContainer } from '../sign-up.container';

describe('SignUp', () => {
  it('should render successfully', () => {
    const { container } = render(<SignUpContainer />);
    expect(container).toMatchSnapshot();
  });
});
