/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { initializeStore, mockAdapters } from '@fixtures/mocks-integration';
import mockResponse from '@fixtures/apis/task-create.json';
import { Provider } from 'react-redux';
import { STORE_STATUS_FINISHED } from 'constants/store';

import { setValueForm } from './fixture';
import { EditContainer } from '../edit.container';
import { ServicesProvider } from 'services';
import { rootReducer as task } from '../../stores';
import { TaskStatus } from '@types';

const onCompleted = jest.fn();
const taskMock = {
  ...mockResponse,
  status: TaskStatus.DONE
};

describe('EditContainer', () => {
  let store: any;

  beforeEach(() => {
    store = initializeStore({
      task
    });
  });

  it('should submit successfully', async () => {
    mockAdapters.post.mockReturnValue(mockResponse);
    const { getByTestId } = render(
      <Provider store={store}>
        <ServicesProvider>
          <EditContainer task={taskMock} onCompleted={onCompleted} />
        </ServicesProvider>
      </Provider>
    );

    await act(async () => {
      setValueForm(fireEvent, getByTestId, { description: 'new description' });
    });

    expect(mockAdapters.post).toHaveBeenCalledWith('/tasks', {
      description: 'new description',
      id: '123',
      status: 'new'
    });
    expect(store.getState().task.patch).toEqual({
      data: {
        description: 'Test done',
        id: '123',
        status: 'done'
      },
      error: null,
      status: STORE_STATUS_FINISHED
    });
  });
});
