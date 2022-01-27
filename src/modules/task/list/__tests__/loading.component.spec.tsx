/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import '@fixtures/mocks';
import React from 'react';

import { LoadingComponent } from '../loading.component';

describe('LoadingComponent', () => {
  it('should render successfully', () => {
    const { container } = render(<LoadingComponent />);
    expect(container).toMatchSnapshot();
  });
});
