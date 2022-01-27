/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, render } from '@testing-library/react';
import React from 'react';
import { initializeStore, mockAdapters } from '@fixtures/mocks-integration';
import mockResponse from '@fixtures/apis/task-list.json';
import { Provider } from 'react-redux';
import { STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';

import { ListContainer } from '../list.container';
import { ServicesProvider } from 'services';
import { rootReducer as task } from '../../stores';
import { sleep } from '@fixtures/wait-for';

describe('ListContainer', () => {
  let store: any;

  beforeEach(() => {
    store = initializeStore({
      task
    });
  });

  it('should render loading state successfully', async () => {
    mockAdapters.get.mockReturnValue(mockResponse);
    render(
      <Provider store={store}>
        <ServicesProvider>
          <ListContainer />
        </ServicesProvider>
      </Provider>
    );

    expect(mockAdapters.get).toHaveBeenCalledWith('/tasks');
    expect(store.getState().task.list).toEqual({
      data: [],
      error: null,
      status: STORE_STATUS_LOADING
    });
  });

  it('should render finish state successfully', async () => {
    mockAdapters.get.mockReturnValue(mockResponse);
    render(
      <Provider store={store}>
        <ServicesProvider>
          <ListContainer />
        </ServicesProvider>
      </Provider>
    );

    await act(async () => {
      await sleep();
    });

    expect(mockAdapters.get).toHaveBeenCalledWith('/tasks');
    expect(store.getState().task.list).toEqual({
      data: [
        {
          id: '123',
          description: 'Test done',
          status: 'done'
        },
        {
          id: '456',
          description: 'Test in progress',
          status: 'in-progress'
        },
        {
          id: '789',
          description: 'Test new',
          status: 'new'
        }
      ],
      error: null,
      status: STORE_STATUS_FINISHED
    });
  });
});
