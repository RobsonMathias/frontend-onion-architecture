/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';
import {
  STORE_TASK_FETCH_LIST_MOCK_FINISHED,
  STORE_TASK_FETCH_LIST_MOCK_LOADING
} from '@fixtures/stores/task';
import { mockComponent } from '@fixtures/mocks';

const mockUseList = jest.fn();
const mockList = jest.fn();
jest.mock('../../hooks', () => ({
  useList: jest.fn((...args) => mockUseList(...args))
}));
jest.mock('./../list-item.container', () => mockComponent(['ListItemContainer']));

import { ListContainer } from '../list.container';

describe('ListContainer', () => {
  it('should render successfully', () => {
    mockUseList.mockImplementation(() => ({
      list: mockList,
      tasks: STORE_TASK_FETCH_LIST_MOCK_FINISHED
    }));
    const { container } = render(<ListContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading successfully', () => {
    mockUseList.mockImplementation(() => ({
      list: mockList,
      tasks: STORE_TASK_FETCH_LIST_MOCK_LOADING
    }));
    const { container } = render(<ListContainer />);
    expect(container).toMatchSnapshot();
  });
});
