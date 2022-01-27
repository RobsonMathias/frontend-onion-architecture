/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { mockUseAuth, Mock } from '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('modules/auth', () => ({
  useAuth: jest.fn().mockImplementation((...args) => mockUseAuth(...args)),
  SignUpContainer: Mock
}));

import SignUpPage from '../sign-up.page';

describe('SignUpPage', () => {
  it('should render successfully', () => {
    const { container } = render(<SignUpPage />);
    expect(container).toMatchSnapshot();
  });
});
