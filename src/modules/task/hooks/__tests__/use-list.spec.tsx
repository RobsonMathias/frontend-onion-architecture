/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { mockServices, mockStore } from '@fixtures/mocks';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

const mockFetchList = jest.fn();
jest.mock('../../stores/tasks.store', () => ({
  fetchList: jest.fn((...args) => mockFetchList(...args))
}));
const { task } = mockServices;
const { useSelector } = mockStore;
import { mockTaskStore } from '@fixtures/stores/task';

import { useList } from '../use-list';

function Component() {
  const { list } = useList();
  return <div data-testid="mock" onClick={() => list()} />;
}

describe('useList', () => {
  it('should call list successfully', async () => {
    useSelector.mockReturnValue(mockTaskStore.task);
    const given = { data: 'MOCKED' };
    task.list.mockImplementation(() => given);

    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });

    expect(mockFetchList).toHaveBeenCalledWith({ data: 'MOCKED' });
    expect(task.list).toHaveBeenCalled();
  });
});
