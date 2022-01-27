/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { Mock, mockComponent, mockWrappers } from '@fixtures/mocks';
import { render } from '@testing-library/react';

jest.mock('../tasks/list.page', () => Mock);
jest.mock('layouts/loaders', () => mockComponent(['PageLoader']));
jest.mock('layouts/header', () => mockComponent(['Header']));
jest.mock('modules/auth', () => mockComponent(['LogoutContainer']));
jest.mock('wrappers', () => mockWrappers);
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    lazy: (callback: any) => {
      callback();
      return Mock;
    }
  };
});

import React from 'react';
import AuthenticatedPage from '../authenticated.page';

describe('AuthenticatedPage', () => {
  it('should render successfully', () => {
    const { container } = render(<AuthenticatedPage />);
    expect(container).toMatchSnapshot();
  });
});
