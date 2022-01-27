/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { CenteredComponent } from '../centered.component';

describe('CenteredComponent', () => {
  const defaultProps = {};

  it('should render successfully', () => {
    const { container } = render(
      <CenteredComponent {...defaultProps}>
        <p>Working!</p>
      </CenteredComponent>
    );
    expect(container).toMatchSnapshot();
  });
});
