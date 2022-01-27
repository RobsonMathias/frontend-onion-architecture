/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';

import { PageLoader } from '../page-loader.component';

describe('PageLoader', () => {
  it('should render successfully', () => {
    const { container } = render(<PageLoader />);
    expect(container).toMatchSnapshot();
  });

  it('when brand is true should render successfully', () => {
    const { container } = render(<PageLoader brand={true} />);
    expect(container).toMatchSnapshot();
  });
});
