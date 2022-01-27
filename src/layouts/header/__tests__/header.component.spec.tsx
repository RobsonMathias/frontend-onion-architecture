/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';

import { Header } from '../header.component';

describe('Header', () => {
  it('should render successfully', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
