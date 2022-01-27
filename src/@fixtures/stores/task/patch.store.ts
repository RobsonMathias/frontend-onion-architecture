import { PatchTaskState } from 'modules/task/stores/patch.store';
import { GenericState } from 'stores/generics';
import {
  STORE_STATUS_ERROR,
  STORE_STATUS_FINISHED,
  STORE_STATUS_INITIALIZED
} from 'constants/store';
import { UNAUTHORIZED_CODE } from 'constants/request-code';
import { TaskStatus } from '@types';

export const STORE_TASK_PATCH_MOCK_INITIALIZED: GenericState<PatchTaskState> = {
  data: {
    status: TaskStatus.NEW,
    id: '',
    description: ''
  },
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const STORE_TASK_PATCH_MOCK_LOADING: GenericState<PatchTaskState> = {
  ...STORE_TASK_PATCH_MOCK_INITIALIZED,
  status: STORE_STATUS_INITIALIZED
};

export const STORE_TASK_PATCH_MOCK_FINISHED: GenericState<PatchTaskState> = {
  data: {
    status: TaskStatus.NEW,
    id: 'Test',
    description: 'Test'
  },
  status: STORE_STATUS_FINISHED,
  error: null
};

export const STORE_TASK_PATCH_MOCK_ERROR: GenericState<PatchTaskState> = {
  ...STORE_TASK_PATCH_MOCK_INITIALIZED,
  error: {
    message: UNAUTHORIZED_CODE,
    name: UNAUTHORIZED_CODE
  },
  status: STORE_STATUS_ERROR
};
