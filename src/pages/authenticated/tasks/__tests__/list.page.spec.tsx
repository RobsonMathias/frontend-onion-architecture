/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import '@fixtures/mocks';
import { render } from '@testing-library/react';
import React from 'react';
import { mockComponent } from '@fixtures/mocks';

jest.mock('modules/task', () => mockComponent(['ListContainer', 'NewContainer']));

import ListPage from '../list.page';

describe('ListPage', () => {
  it('should render successfully', () => {
    const { container } = render(<ListPage />);
    expect(container).toMatchSnapshot();
  });
});
