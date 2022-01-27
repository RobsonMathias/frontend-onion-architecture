/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { mockUseAuth, Mock } from '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('modules/auth', () => ({
  useAuth: jest.fn().mockImplementation(() => mockUseAuth()),
  LoginContainer: Mock,
  GoogleContainer: Mock
}));

import LoginPage from '../login.page';

describe('LoginPage', () => {
  it('should render successfully', () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
