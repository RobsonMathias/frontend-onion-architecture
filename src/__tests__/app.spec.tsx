/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { mockComponent } from '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('../pages/router', () => mockComponent(['Router']));
jest.mock('services', () => mockComponent(['ServicesProvider']));
jest.mock('react-redux', () => mockComponent(['Provider']));

import App from '../app';

describe('App', () => {
  it('should render successfully', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
