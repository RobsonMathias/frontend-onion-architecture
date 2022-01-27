/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

const mockLoginWithGoogle = jest.fn();
const mockUseLogin = jest.fn(() => ({ loginWithGoogle: jest.fn(() => mockLoginWithGoogle()) }));
jest.mock('../../hooks', () => ({ useLogin: jest.fn(() => mockUseLogin()) }));

import { GoogleContainer } from '../google.container';

describe('GoogleContainer', () => {
  it('should render successfully', () => {
    const { container } = render(<GoogleContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should call loginWithGoogle successfully', async () => {
    const { getByTestId } = render(<GoogleContainer />);
    await act(async () => {
      fireEvent.click(getByTestId('google-submit'));
    });
    expect(mockLoginWithGoogle).toHaveBeenCalled();
  });
});
