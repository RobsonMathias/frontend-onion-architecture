import { TasksState } from 'modules/task/stores/tasks.store';
import { GenericState } from 'stores/generics';
import {
  STORE_STATUS_ERROR,
  STORE_STATUS_FINISHED,
  STORE_STATUS_INITIALIZED,
  STORE_STATUS_LOADING
} from 'constants/store';
import { UNAUTHORIZED_CODE } from 'constants/request-code';
import { TaskStatus } from '@types';

export const STORE_TASK_FETCH_LIST_MOCK_INITIALIZED: GenericState<TasksState> = {
  data: [],
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const STORE_TASK_FETCH_LIST_MOCK_LOADING: GenericState<TasksState> = {
  ...STORE_TASK_FETCH_LIST_MOCK_INITIALIZED,
  status: STORE_STATUS_LOADING
};

export const STORE_TASK_FETCH_LIST_MOCK_FINISHED: GenericState<TasksState> = {
  data: [
    {
      id: '123',
      status: TaskStatus.DONE,
      description: 'description'
    }
  ],
  status: STORE_STATUS_FINISHED,
  error: null
};

export const STORE_TASK_FETCH_LIST_MOCK_ERROR: GenericState<TasksState> = {
  ...STORE_TASK_FETCH_LIST_MOCK_INITIALIZED,
  error: {
    message: UNAUTHORIZED_CODE,
    name: UNAUTHORIZED_CODE
  },
  status: STORE_STATUS_ERROR
};
