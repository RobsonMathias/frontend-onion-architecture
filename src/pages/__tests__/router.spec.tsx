/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { Mock } from '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('../authenticated/authenticated.page', () => Mock);
jest.mock('../public/public.page', () => Mock);

import { Router } from '../router';

describe('Router', () => {
  it('should render successfully', () => {
    const { container } = render(<Router />);
    expect(container).toMatchSnapshot();
  });
});
