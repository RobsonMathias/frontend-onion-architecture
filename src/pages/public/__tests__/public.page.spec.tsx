/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { Mock } from '@fixtures/mocks';
import { render } from '@testing-library/react';

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

import PublicPage from '../public.page';

describe('PublicPage', () => {
  it('should render successfully', () => {
    const { container } = render(<PublicPage />);
    expect(container).toMatchSnapshot();
  });
});
