/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

const mockLogout = jest.fn();
const mockUseAuth = jest.fn(() => ({ logout: jest.fn(() => mockLogout()) }));
jest.mock('../../hooks', () => ({ useAuth: jest.fn(() => mockUseAuth()) }));

import { LogoutContainer } from '../logout.container';

describe('LogoutContainer', () => {
  it('should render successfully', () => {
    const { container } = render(<LogoutContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should call logout successfully', async () => {
    const { getByTestId } = render(<LogoutContainer />);
    await act(async () => {
      fireEvent.click(getByTestId('logout'));
    });
    expect(mockLogout).toHaveBeenCalled();
  });
});
